import { useState, useEffect } from "react";
import axios from "axios";

export const ServicosBarbearia = () => {
  const [service, setService] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: "",
  });

  const [servicesList, setServicesList] = useState([]);
  const [error, setError] = useState("");

  // 🔹 Função para buscar serviços do backend
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/servicos/listar");
      setServicesList(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      setError("Erro ao carregar os serviços.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔹 Atualiza os campos do formulário
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "preco") {
      value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      value = (parseFloat(value) / 100).toFixed(2); // Formata como decimal
      value = value > 0 ? value : "0.00"; // Garante que não fique negativo
    }

    setService({ ...service, [name]: value });
  };

  // 🔹 Enviar dados ao backend para salvar serviço
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/servicos/salvar", service);
      alert("Serviço salvo com sucesso!");
      setService({ nome: "", descricao: "", preco: "", duracao: "" });
      fetchServices(); // Atualiza a lista após salvar
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
      alert(error.response?.data?.message || "Erro ao salvar serviço.");
    }
  };

  // 🔹 Remover um serviço pelo ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja remover este serviço?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/servicos/remover/${id}`);
      alert("Serviço removido com sucesso!");
      fetchServices(); // Atualiza a lista após remoção
    } catch (error) {
      console.error("Erro ao remover serviço:", error);
      alert("Erro ao remover o serviço.");
    }
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
            <input
              type="text"
              name="nome"
              value={service.nome}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Descrição</label>
            <input
              type="text"
              name="descricao"
              value={service.descricao}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Preço</label>
            <input
              type="text"
              name="preco"
              value={service.preco}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Duração (minutos)</label>
            <input
              type="number"
              name="duracao"
              value={service.duracao}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Salvar Serviço
          </button>
        </form>
      </div>

      {/* 🔹 Exibir serviços cadastrados */}
      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Serviços Cadastrados</h2>
        {error && <p className="text-red-500">{error}</p>}
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
                <button
                  onClick={() => handleDelete(servico.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
