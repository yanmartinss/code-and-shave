import { useState, useEffect } from "react";
import axios from "axios";

export const EditarBarbeiros = () => {
  const [barber, setBarber] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [], // Alterado para um array de especialidades
  });

  const [servicesList, setServicesList] = useState([]); // Lista de serviços disponíveis

  // 📌 Buscar serviços do backend
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/servicos/listar");
      setServicesList(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarber({ ...barber, [name]: value });
  };

  const handleSpecialtyChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setBarber({ ...barber, specialties: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/barbeiros/cadastrar", barber);
      alert("Barbeiro cadastrado com sucesso!");
      setBarber({ name: "", email: "", phone: "", specialties: [] });
    } catch (error) {
      console.error("Erro ao salvar barbeiro:", error);
    }
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
            <label className="block font-semibold">Especialidades</label>
            <select
              multiple
              name="specialties"
              value={barber.specialties}
              onChange={handleSpecialtyChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {servicesList.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Salvar Barbeiro
          </button>
        </form>
      </div>
    </div>
  );
};
