import { useState, useEffect } from "react";
import axios from "axios";

export const ServicosBarbearia = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  const [servicesList, setServicesList] = useState([]);

  // Função para buscar serviços do backend
  const fetchServices = async () => {
    try {
      // Substitua a URL pela URL real da API
      const response = await axios.get("http://localhost:3001/api/servicos"); // <-- INSERIR AQUI A ROTA REAL DO BACKEND
      setServicesList(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Formata o preço enquanto digita
    if (name === "price") {
      value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
      value = (parseFloat(value) / 100).toFixed(2); // Formata como decimal
      value = `R$ ${value}`; // Adiciona o símbolo de moeda
    }

    setService({ ...service, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Substituir pela requisição ao backend
      await axios.post("http://localhost:3001/api/servicos", service); // <-- INSERIR AQUI A ROTA REAL DO BACKEND
      alert("Serviço salvo com sucesso!");
      setService({ name: "", description: "", price: "", duration: "" });
      fetchServices(); // Atualiza a lista após salvar
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
    }
  }

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
              name="name"
              value={service.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Descrição</label>
            <input
              type="text"
              name="description"
              value={service.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Preço</label>
            <input
              type="text"
              name="price"
              value={service.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Duração (minutos)</label>
            <input
              type="number"
              name="duration"
              value={service.duration}
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

      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Serviços Cadastrados</h2>
        {servicesList.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum serviço cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {servicesList.map((servico) => (
              <li key={servico.id} className="border-b pb-2">
                <p className="font-semibold">{servico.name}</p>
                <p className="text-gray-600">{servico.description}</p>
                <p className="text-gray-800 font-bold">{servico.price}</p>
                <p className="text-gray-500">Duração: {servico.duration} min</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}