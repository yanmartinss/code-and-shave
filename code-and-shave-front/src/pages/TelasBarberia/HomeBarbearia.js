import React, { useState, useEffect } from 'react';
import { Slideshow } from '../../components/slides/Slideshow';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/axiosInstance';

export const HomeBarbearia = () => {
  const slides = [slide1, slide2, slide3, slide4];

  // 🔹 Recupera os dados do usuário do localStorage
  const usuarioSalvo = localStorage.getItem('usuario');

  // 🔹 Verifica se `usuarioSalvo` não é null ou um valor inválido antes de usar JSON.parse()
  const usuario = usuarioSalvo && usuarioSalvo.startsWith("{") ? JSON.parse(usuarioSalvo) : null;

  // 🔹 Garante que `barberShopName` pega o nome correto da barbearia
  const barberShopName = usuario && usuario.nome ? usuario.nome : 'Barbearia';


  const [agendamentos, setAgendamentos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAgendamentos = async () => {
    try {
      const response = await api.get('/api/agendamentos-proximos'); // Substituir pela URL real do backend
      setAgendamentos(response.data);
    } catch (err) {
      setError('Erro ao carregar os próximos agendamentos.');
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen">
      <Slideshow slides={slides} />

      <div className="w-full max-w-screen-md mt-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Bem-vindo de volta, {barberShopName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie seus horários, promoções e equipe de barbeiros!
        </p>
      </div>

      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Atalhos Rápidos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button
            className="p-4 bg-blue-500 text-white shadow-md rounded-lg flex flex-col items-center hover:bg-blue-600 transition"
            onClick={() => navigate('/agendamentos-barbearia')}
          >
            <EventIcon className="text-4xl mb-2" />
            <span className="font-bold">Gerenciar Horários</span>
          </button>
          <button
            className="p-4 bg-purple-500 text-white shadow-md rounded-lg flex flex-col items-center hover:bg-purple-600 transition"
            onClick={() => navigate('/clientes-cadastrados')}
          >
            <GroupIcon className="text-4xl mb-2" />
            <span className="font-bold">Clientes Cadastrados</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Próximos Agendamentos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {agendamentos.length > 0 ? (
            agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="p-4 bg-white shadow-md rounded-lg">
                <h4 className="font-bold text-[#111827]">Cliente: {agendamento.cliente}</h4>
                <p className="text-gray-600">Serviço: {agendamento.servico}</p>
                <p className="text-gray-600">Data: {agendamento.data}</p>
                <p className="text-gray-600">Horário: {agendamento.horario}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
          {error}
        </div>
      )}
    </div>
  );
}
