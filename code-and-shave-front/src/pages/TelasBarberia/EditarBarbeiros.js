import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorModal } from "../../components/modals/ErrorModal";
import api from "../../services/axiosInstance";

export const EditarBarbeiros = () => {
  const [barber, setBarber] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [],
  });

  const [barbersList, setBarbersList] = useState([]); // Lista de barbeiros cadastrados
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estado para controlar a exibição do modal
  const [modalTitle, setModalTitle] = useState("Erro"); // Estado para o título do modal
  const [editingBarber, setEditingBarber] = useState(null); // Armazena o barbeiro em edição
  const [servicesList, setServicesList] = useState([]); // 🔹 Agora inicia como um array vazio

  // 📌 Buscar serviços e barbeiros do backend
  useEffect(() => {
    fetchServices();
    fetchBarbers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/servicos/listar");
      setServicesList(Array.isArray(response.data) ? response.data : []); // 🔹 Garante que sempre seja um array
    } catch (error) {
      setServicesList([]); // 🔹 Se der erro, define como um array vazio
      setModalTitle("Erro ao Buscar Serviços");
      setError("Não foi possível carregar os serviços.");
      setIsErrorModalOpen(true);
      console.error("Erro ao buscar serviços:", error);
    }
  }  

  const handleEdit = (barbeiro) => {
    setEditingBarber(barbeiro);
    setBarber({
      name: barbeiro.name,
      email: barbeiro.email,
      phone: barbeiro.phone,
      specialties: barbeiro.specialties.map(s => s.id) // Mantém os serviços selecionados
    });
  }  

  const fetchBarbers = async () => {
    try {
      const response = await api.get("/barbeiros/listar");
      setBarbersList(response.data);
    } catch (error) {
      setModalTitle("Erro ao Buscar Barbeiros");
      setError("Não foi possível carregar os barbeiros.");
      setIsErrorModalOpen(true);
      console.error("Erro ao buscar barbeiros:", error);
    }
  };

  // Atualiza os campos do barbeiro
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarber({ ...barber, [name]: value });
  };

  // Atualiza especialidades (serviços) do barbeiro
  const handleSpecialtyChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setBarber({ ...barber, specialties: selectedOptions.map(Number) });
  };

  // Enviar os dados do barbeiro ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const specialtiesFormatted = barber.specialties.map(id => ({ id }));
  
    const barberData = {
      ...barber,
      specialties: specialtiesFormatted,
    };
  
    try {
      let response;
      if (editingBarber) {
        // Atualizar barbeiro
        response = await api.put(`/barbeiros/atualizar/${editingBarber.id}`, barberData);
        setModalTitle("Sucesso");
        setError("Barbeiro atualizado com sucesso!");
      } else {
        // Cadastrar novo barbeiro
        response = await api.post("/barbeiros/cadastrar", barberData);
        setModalTitle("Sucesso");
        setError("Barbeiro cadastrado com sucesso!");
      }
  
      setIsErrorModalOpen(true);
      setEditingBarber(null); // Reseta edição
      setBarber({ name: "", email: "", phone: "", specialties: [] });
      fetchBarbers(); // Atualiza a lista
    } catch (error) {
      setModalTitle("Erro");
      setError("Erro ao salvar barbeiro.");
      setIsErrorModalOpen(true);
    }
  }  

  // 🔹 Remover um barbeiro pelo ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja remover este barbeiro?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/barbeiros/remover/${id}`);
      setModalTitle("Sucesso");
      setError("Barbeiro removido com sucesso!");
      setIsErrorModalOpen(true);
      fetchBarbers(); // Atualiza a lista após remoção
    } catch (error) {
      setModalTitle("Erro ao Remover");
      setError("Erro ao remover o barbeiro.");
      setIsErrorModalOpen(true);
      console.error("Erro ao remover barbeiro:", error);
    }
  };

  // 🔹 Fechar modal de erro
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar / Editar Barbeiros</h1>
      <div className="w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nome</label>
            <input
              type="text"
              name="name"
              value={barber.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              value={barber.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Telefone</label>
            <input
              type="text"
              name="phone"
              value={barber.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Serviços realizados</label>
            <select
              name="specialties"
              value={barber.specialties}
              onChange={handleSpecialtyChange}
              multiple
              className="w-full p-2 border border-gray-300 rounded"
            >
              {Array.isArray(servicesList) && servicesList.length > 0 ? (
                servicesList.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.nome} - R$ {service.preco} ({service.duracao} min)
                  </option>
                ))
              ) : (
                <option disabled>Nenhum serviço disponível</option> // 🔹 Caso não haja serviços
              )}
            </select>
            <p className="text-gray-600 text-sm">Segure CTRL (Windows) ou CMD (Mac) para selecionar vários.</p>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          {editingBarber ? "Atualizar Barbeiro" : "Salvar Barbeiro"}
        </button>
        </form>
      </div>

      {/* 🔹 Listagem de Barbeiros Cadastrados */}
      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Barbeiros Cadastrados</h2>
        {barbersList.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum barbeiro cadastrado.</p>
        ) : (
          <ul className="space-y-4">
  {barbersList.map((barbeiro) => (
    <li key={barbeiro.id} className="border-b pb-2 flex justify-between items-center">
      <div>
        <p className="font-semibold">{barbeiro.name}</p>
        <p className="text-gray-600">Email: {barbeiro.email}</p>
        <p className="text-gray-600">Telefone: {barbeiro.phone}</p>
        <p className="text-gray-800 font-bold mt-2">Serviços:</p>
              <ul className="list-disc ml-4">
                {barbeiro.specialties && barbeiro.specialties.length > 0 ? (
                  barbeiro.specialties.map((servico) => (
                    <li key={servico.id}>{servico.nome} - R$ {servico.preco} ({servico.duracao} min)</li>
                  ))
                ) : (
                  <li className="text-gray-500">Nenhum serviço atribuído</li>
                )}
              </ul>
            </div>
            <div className="flex space-x-2">
              {/* Botão Editar */}
              <button
                onClick={() => handleEdit(barbeiro)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg shadow hover:bg-blue-700 transition duration-200"
              >
                Editar
              </button>
              
              {/* Botão Remover */}
              <button
                onClick={() => handleDelete(barbeiro.id)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg shadow hover:bg-red-700 transition duration-200"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
        )}
      </div>
      {/* 🔹 Modal de Erro/Sucesso */}
      <ErrorModal open={isErrorModalOpen} onClose={handleCloseErrorModal} title={modalTitle} message={error} />
    </div>
  );
}