import React, { useState, useEffect } from "react";
import { Slideshow } from "../../components/slides/Slideshow";
import { useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person"; // Ícone para perfil
import api from "../../services/axiosInstance";

import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";
import { getUserFromToken, isTokenValid } from "../../utils/auth";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const HomeBarbearia = () => {
  const slides = [slide1, slide2, slide3, slide4];
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [error, setError] = useState("");

  // Obtém os dados do usuário logado
  const usuario = isTokenValid() ? getUserFromToken() : null;
  console.log("Usuário decodificado:", usuario); 

  const barberShopName = usuario?.nome || "Barbearia";

  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen">
      <Slideshow slides={slides} />

      <div className="w-full max-w-screen-md mt-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Bem-vindo de volta, {barberShopName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie seus horários, serviços oferecidos e equipe de barbeiros!
        </p>
      </div>

      {/* 🔹 Atalhos Rápidos */}
      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">
          Atalhos Rápidos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 🔹 Botão Gerenciar Horários */}
          <button
            className="p-4 bg-blue-500 text-white shadow-md rounded-lg flex flex-col items-center hover:bg-blue-600 transition"
            onClick={() => navigate("/agendamentos-barbearia")}
          >
            <EventIcon className="text-4xl mb-2" />
            <span className="font-bold">Gerenciar Horários</span>
          </button>

          {/* 🔹 Botão Clientes Cadastrados */}
          <button
            className="p-4 bg-purple-500 text-white shadow-md rounded-lg flex flex-col items-center hover:bg-purple-600 transition"
            onClick={() => navigate("/clientes-cadastrados")}
          >
            <GroupIcon className="text-4xl mb-2" />
            <span className="font-bold">Clientes Cadastrados</span>
          </button>

          {/* 🔹 Novo Botão Gerenciar Perfil */}
          <button
            className="p-4 bg-green-500 text-white shadow-md rounded-lg flex flex-col items-center hover:bg-green-600 transition"
            onClick={() => navigate("/gestao-barbearia")}
          >
            <ManageAccountsIcon className="text-4xl mb-2" />
            <span className="font-bold">Gestão da Barbearia</span>
          </button>
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