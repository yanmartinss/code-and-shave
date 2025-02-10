import { useState, useEffect } from "react";
import axios from "axios";

export const EditarBarbeiros = () => {
  const [barbeiro, setBarbeiro] = useState({
    nome: "",
    email: "",
    telefone: "",
    especialidade: "",
  });

  const [barbeirosList, setBarbeirosList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Função para buscar barbeiros do backend
  const fetchBarbeiros = async () => {
    try {
      const response = await axios.get("http://localhost:8080/barbeiros/listar");
      setBarbeirosList(response.data);
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  };

  useEffect(() => {
    fetchBarbeiros();
  }, []);

  const handleChange = (e) => {
    setBarbeiro({ ...barbeiro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post("http://localhost:8080/barbeiros/cadastrar", barbeiro);
      alert("Barbeiro cadastrado com sucesso!");
      setBarbeiro({ nome: "", email: "", telefone: "", especialidade: "" });
      fetchBarbeiros();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          const errorData = error.response.data;
          if (typeof errorData === "string") {
            setErrorMessage(errorData);
          } else if (errorData.message) {
            setErrorMessage(errorData.message);
          } else {
            setErrorMessage("Erro ao salvar barbeiro.");
          }
        } else {
          setErrorMessage("Erro ao salvar barbeiro.");
        }
      } else {
        setErrorMessage("Erro ao conectar com o servidor.");
      }
    }
  };

  // 🔹 Função para remover barbeiro (passando explicitamente o ID correto)
  const handleDelete = async (id) => {
    if (!id) {
        console.error("Erro: ID do barbeiro não encontrado.");
        setErrorMessage("Erro ao remover barbeiro: ID inválido.");
        return;
    }

    console.log("Removendo barbeiro com ID:", id); // 🔹 Debug para ver qual ID está sendo passado

    const confirmDelete = window.confirm("Tem certeza que deseja remover este barbeiro?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:8080/barbeiros/remover/${id}`);
        alert("Barbeiro removido com sucesso!");
        fetchBarbeiros();
    } catch (error) {
        console.error("Erro ao remover barbeiro:", error);
        setErrorMessage("Erro ao remover barbeiro.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar / Editar Barbeiros</h1>
      
      {/* 🔹 Formulário de Cadastro */}
      <div className="w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nome</label>
            <input
              type="text"
              name="nome"
              value={barbeiro.nome}
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
              value={barbeiro.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={barbeiro.telefone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Especialidade</label>
            <input
              type="text"
              name="especialidade"
              value={barbeiro.especialidade}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* 🔹 Exibe mensagem de erro se houver */}
          {errorMessage && (
            <p className="text-red-600 text-center font-semibold">{errorMessage}</p>
          )}

          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Salvar Barbeiro
          </button>
        </form>
      </div>

      {/* 🔹 Lista de Barbeiros Cadastrados */}
      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Barbeiros Cadastrados</h2>
        {barbeirosList.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum barbeiro cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {barbeirosList.map((barbeiro) => (
              <li key={barbeiro.idbarbeiro} className="border-b pb-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{barbeiro.nome}</p>
                  <p className="text-gray-600">{barbeiro.email}</p>
                  <p className="text-gray-800 font-bold">{barbeiro.telefone}</p>
                  <p className="text-gray-500">Especialidade: {barbeiro.especialidade}</p>
                </div>
                <button
                  onClick={() => handleDelete(barbeiro.idbarbeiro)}
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
