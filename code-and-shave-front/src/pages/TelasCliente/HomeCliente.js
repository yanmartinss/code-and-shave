import React, { useState, useEffect } from 'react';
import { Slideshow } from '../../components/slides/Slideshow';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import api from '../../services/axiosInstance';

export const HomeCliente = () => {
  const slides = [slide1, slide2, slide3, slide4];

  // Obtém os dados do usuário logado do localStorage
  const usuarioSalvo = localStorage.getItem('usuario');
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  const clienteId = usuario?.id || null; // Obtém o ID do cliente
  const username = usuario ? usuario.nome : 'Cliente';

  const [agendamentos, setAgendamentos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgendamentos = async () => {
      if (!clienteId) {
        console.error("❌ Cliente ID não encontrado no localStorage.");
        setError("Erro ao carregar seus agendamentos. Tente novamente mais tarde.");
        return;
      }

      console.log(`📌 Buscando agendamentos para Cliente ID: ${clienteId}`);

      try {
        const response = await api.get(`/api/agendamentos-cliente/${clienteId}`);
        
        console.log("📌 Resposta da API:", response);
        console.log("📌 Agendamentos recebidos:", response.data);

        // Ordena os agendamentos por data decrescente
        const agendamentosOrdenados = response.data.sort((a, b) => new Date(b.data) - new Date(a.data));

        setAgendamentos(agendamentosOrdenados);
      } catch (error) {
        console.error("❌ Erro ao buscar agendamentos:", error.response || error);
        setError("Erro ao carregar seus agendamentos. Tente novamente mais tarde.");
      }
    };

    fetchAgendamentos();
  }, [clienteId]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen">
      <Slideshow slides={slides} />

      <div className="w-full max-w-screen-md mt-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">Bem-vindo, {username}!</h1>
        <p className="text-gray-600 mt-2">
          Estamos felizes em te ver. Explore suas opções e aproveite nossos serviços!
        </p>
      </div>

      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Seus Agendamentos Recentes</h3>
        
        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}

        {agendamentos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {agendamentos.map((agendamento) => (
              <div 
                key={agendamento.id} 
                className="p-4 bg-white shadow-lg rounded-lg border-l-4 border-blue-500"
              >
                <h4 className="font-bold text-[#111827] text-lg mb-1">
                  {agendamento.servico?.nome} 
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Barbeiro:</span> {agendamento.barbeiro?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Data:</span> {formatDate(agendamento.data)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Horário:</span> {agendamento.horario}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            Você ainda não tem agendamentos.
          </p>
        )}
      </div>
    </div>
  );
}