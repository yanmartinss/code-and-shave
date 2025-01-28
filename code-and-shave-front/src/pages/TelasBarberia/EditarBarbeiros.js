import { useState, useEffect } from "react";
import axios from "axios";

export const EditarBarbeiros = () => {
  const [barber, setBarber] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
  });

  const [barbersList, setBarbersList] = useState([]);

  // Função para buscar barbeiros do backend
  const fetchBarbers = async () => {
    try {
      // Substitua a URL pela URL real da API
      const response = await axios.get("http://localhost:3001/api/barbeiros"); // <-- INSERIR AQUI A ROTA REAL DO BACKEND
      setBarbersList(response.data);
    } catch (error) {
      console.error("Erro ao buscar barbeiros:", error);
    }
  }

  useEffect(() => {
    fetchBarbers();
  }, []);

  const handleChange = (e) => {
    setBarber({ ...barber, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Substituir pela requisição ao backend
      await axios.post("http://localhost:3001/api/barbeiros", barber); // <-- INSERIR AQUI A ROTA REAL DO BACKEND
      alert("Barbeiro cadastrado com sucesso!");
      setBarber({ name: "", email: "", phone: "", specialty: "" });
      fetchBarbers(); // Atualiza a lista após salvar
    } catch (error) {
      console.error("Erro ao salvar barbeiro:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastrar / Editar Barbeiros
      </h1>
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
            <label className="block font-semibold">Especialidade</label>
            <input
              type="text"
              name="specialty"
              value={barber.specialty}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Salvar Barbeiro
          </button>
        </form>
      </div>

      {/* Lista de barbeiros cadastrados */}
      <div className="mt-10 w-[500px] p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Barbeiros Cadastrados</h2>
        {barbersList.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum barbeiro cadastrado.</p>
        ) : (
          <ul className="space-y-4">
            {barbersList.map((barbeiro) => (
              <li key={barbeiro.id} className="border-b pb-2">
                <p className="font-semibold">{barbeiro.name}</p>
                <p className="text-gray-600">{barbeiro.email}</p>
                <p className="text-gray-800 font-bold">{barbeiro.phone}</p>
                <p className="text-gray-500">Especialidade: {barbeiro.specialty}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}