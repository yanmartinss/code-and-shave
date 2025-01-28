import React, { useState } from 'react';
import { Slideshow } from '../../components/slides/Slideshow';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';

export const HomeCliente = () => {
  const slides = [slide1, slide2, slide3, slide4];
  const [username] = useState('Yan'); 

  return (
    <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen">
      <Slideshow slides={slides} />

      <div className="w-full max-w-screen-md mt-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">Bem-vindo de volta, {username}!</h1>
        <p className="text-gray-600 mt-2">Estamos felizes em te ver novamente. Explore suas opções e aproveite nossos serviços!</p>
      </div>

      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Seus Agendamentos Recentes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="font-bold text-[#111827]">Corte com Barbeiro X</h4>
            <p className="text-gray-600">Data: 28/11/2024</p>
            <p className="text-gray-600">Horário: 15:00</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="font-bold text-[#111827]">Barba e Bigode</h4>
            <p className="text-gray-600">Data: 25/11/2024</p>
            <p className="text-gray-600">Horário: 14:00</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Barbeiros em Destaque</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h4 className="font-bold text-[#111827]">João</h4>
            <p className="text-gray-600">Especialista em cortes clássicos</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h4 className="font-bold text-[#111827]">Maria</h4>
            <p className="text-gray-600">Técnicas modernas e design</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h4 className="font-bold text-[#111827]">Carlos</h4>
            <p className="text-gray-600">Atendimento personalizado</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full max-w-screen-md mt-12 px-4">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">Promoções e Novidades</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="font-bold text-[#111827]">20% de desconto em cortes</h4>
            <p className="text-gray-600">Válido até 30/11/2024</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h4 className="font-bold text-[#111827]">Pacote Barba e Bigode</h4>
            <p className="text-gray-600">Promoção especial por R$50</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}