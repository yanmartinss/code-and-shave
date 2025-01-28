import React from 'react';
import { useNavigate } from 'react-router-dom';

export const GestaoBarbearia = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Gerenciar Perfil',
            description: 'Edite as informações básicas da sua barbearia, como nome, endereço e contato.',
            action: () => navigate('/perfil-barbearia'),
        },
        {
            title: 'Cadastrar/Editar Serviços',
            description: 'Adicione ou edite os serviços oferecidos, como cortes de cabelo, barba e promoções.',
            action: () => navigate('/servicos-barbearia'),
        },
        {
            title: 'Cadastrar/Editar Barbeiros',
            description: 'Gerencie a equipe de barbeiros, adicione novos profissionais ou edite os dados existentes.',
            action: () => navigate('/editar-barbeiros'),
        },
        {
            title: 'Gerenciar Agendamentos',
            description: 'Visualize e organize os agendamentos dos clientes para um atendimento eficiente.',
            action: () => navigate('/agendamentos-barbearia'),
        },
        // {
        //     title: 'Gerenciar Horários de Funcionamento',
        //     description: 'Configure os horários de abertura e fechamento da barbearia para cada dia da semana.',
        //     action: () => navigate('/horarios-funcionamento'),
        // },
        // {
        //     title: 'Relatórios',
        //     description: 'Acompanhe o desempenho da barbearia com relatórios de faturamento e atendimento.',
        //     action: () => navigate('/relatorios-barbearia'),
        // },
    ];

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <div className="w-full max-w-screen-md text-center">
                <h1 className="text-2xl font-bold text-[#111827]">Gestão da Barbearia</h1>
                <p className="text-gray-600 mt-2">
                    Gerencie todas as operações da sua barbearia de forma simples e rápida.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-screen-md">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition cursor-pointer"
                        onClick={item.action}
                    >
                        <h3 className="text-lg font-semibold text-[#111827]">{item.title}</h3>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}