import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Notificacoes = () => {
    const [recentNotifications, setRecentNotifications] = useState([]);
    const [historicNotifications, setHistoricNotifications] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Busca notificações recentes e históricas do backend
    const fetchNotifications = async () => {
        try {
            // Requisição para notificações recentes
            const recentResponse = await axios.get('/api/notificacoes-recentes');
            setRecentNotifications(recentResponse.data);

            // Requisição para histórico de notificações
            const historicResponse = await axios.get('/api/notificacoes-historico');
            setHistoricNotifications(historicResponse.data);
        } catch (error) {
            setErrorMessage('Erro ao carregar notificações. Tente novamente mais tarde.');
            console.error('Erro ao buscar notificações:', error);
        }
    };

    // Carrega notificações ao montar o componente
    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <div className="w-full max-w-screen-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#111827] text-center mb-6">Notificações</h1>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-[#111827] mb-4">Notificações Recentes</h2>
                    {recentNotifications.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {recentNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="p-4 bg-green-100 border border-green-300 rounded-md shadow-sm"
                                >
                                    <p className="text-sm text-green-900">{notification.message}</p>
                                    <span className="text-xs text-green-700">{notification.date}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Sem notificações recentes.</p>
                    )}
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-[#111827] mb-4">Histórico de Notificações</h2>
                    {historicNotifications.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {historicNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <p className="text-sm text-gray-900">{notification.message}</p>
                                    <span className="text-xs text-gray-700">{notification.date}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Sem histórico de notificações.</p>
                    )}
                </div>

                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}