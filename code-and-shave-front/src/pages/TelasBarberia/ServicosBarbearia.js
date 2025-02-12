import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorModal } from "../../components/modals/ErrorModal";
import api from "../../services/axiosInstance";

export const ServicosBarbearia = () => {
  const [service, setService] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: "", 
  });

  const [servicesList, setServicesList] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Erro");

  
  const fetchServices = async () => {
    try {
      const response = await api.get("/servicos/listar");
      setServicesList(Array.isArray(response.data) ? response.data : []); 
    } catch (error) {
      setServicesList([]);
      setModalTitle("Erro ao Buscar Serviços");
      setError("Não foi possível carregar os serviços.");
      setIsErrorModalOpen(true);
      console.error("Erro ao buscar serviços:", error);
    }
  }  

  useEffect(() => {
    fetchServices();
  }, []);

  
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "preco") {
      value = value.replace(/\D/g, "");
      value = (parseFloat(value) / 100).toFixed(2);
      value = value > 0 ? value : "0.00";
    }
    setService({ ...service, [name]: value });
  };

  
  const handleEdit = (servico) => {
    setEditingService(servico);
    setService({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      duracao: servico.duracao, 
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceData = {
      id: editingService ? editingService.id : null,
      ...service,
    };

    try {
      await api.post("/servicos/salvar", serviceData);
      setModalTitle("Sucesso");
      setError(editingService ? "Serviço atualizado com sucesso!" : "Serviço salvo com sucesso!");
      setIsErrorModalOpen(true);
      setService({ nome: "", descricao: "", preco: "", duracao: "" });
      setEditingService(null);
      fetchServices();
    } catch (error) {
      setModalTitle("Erro ao Salvar Serviço");
      setError(error.response?.data?.message || "Erro ao salvar serviço.");
      setIsErrorModalOpen(true);
      console.error("Erro ao salvar serviço:", error);
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja remover este serviço?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/servicos/remover/${id}`);
      console.log(`Serviço removido com sucesso. ID: ${id}`, response);

      setServicesList((prevList) => prevList.filter(servico => servico.id !== id));

      setModalTitle("Sucesso");
      setError("Serviço removido com sucesso!");
      setIsErrorModalOpen(true);
    } catch (error) {
      console.error("Erro ao remover serviço:", error.response?.data || error);

      setModalTitle("Erro ao Remover Serviço");
      setError(error.response?.data?.message || "Erro ao remover o serviço.");
      setIsErrorModalOpen(true);
    }
  };

  
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastrar / Editar Serviços
      </h1>
      <div className="w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nome do Serviço</label>
            <input type="text" name="nome" value={service.nome} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block font-semibold">Descrição</label>
            <input type="text" name="descricao" value={service.descricao} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block font-semibold">Preço</label>
            <input type="text" name="preco" value={service.preco} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block font-semibold">Duração (minutos)</label>
            <input type="number" name="duracao" value={service.duracao} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            {editingService ? "Atualizar Serviço" : "Salvar Serviço"}
          </button>
        </form>
      </div>

      {/*  Exibir serviços cadastrados */}
      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Serviços Cadastrados</h2>
        
        {servicesList.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum serviço cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {servicesList.map((servico) => (
              <li key={servico.id} className="border-b pb-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{servico.nome}</p>
                  <p className="text-gray-600">{servico.descricao}</p>
                  <p className="text-gray-800 font-bold">R$ {servico.preco}</p>
                  <p className="text-gray-500">Duração: {servico.duracao} min</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(servico)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(servico.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/*  Modal de Erro/Sucesso */}
      <ErrorModal open={isErrorModalOpen} onClose={handleCloseErrorModal} title={modalTitle} message={error} />
    </div>
  );
}