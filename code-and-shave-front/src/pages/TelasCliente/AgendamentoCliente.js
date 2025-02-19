import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from 'jwt-decode'; 
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import api from '../../services/axiosInstance';
import { ErrorModal } from '../../components/modals/ErrorModal';

export const AgendamentoCliente = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [barbeiros, setBarbeiros] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [barbeiroId, setBarbeiroId] = useState(null);
    const [servicoId, setServicoId] = useState(null);
    const [clienteId, setClienteId] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isCancelMode, setIsCancelMode] = useState(false);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setClienteId(decoded.id); 
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
            }
        }

        const fetchBarbeiros = async () => {
            try {
                const response = await api.get('/barbeiros/listar'); 
                setBarbeiros(response.data);
            } catch (error) {
                console.error('Erro ao carregar barbeiros:', error);
            }
        };
        fetchBarbeiros();
    }, []);

    useEffect(() => {
        if (barbeiroId) {
            fetchServicos(barbeiroId);
        } else {
            setServicos([]);
        }
    }, [barbeiroId]);

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        } else {
            setAvailableTimes([]);
        }
    }, [selectedDate]);

    const fetchAvailableTimes = async (date) => {
        if (!date) return;
        try {
            const response = await api.get(`/api/horarios-disponiveis`, {
                params: { date: date.toISOString().split('T')[0] },
            });
            setAvailableTimes(response.data);
        } catch (error) {
            console.error('Erro ao buscar horários disponíveis:', error);
        }
    };

    const fetchServicos = async (barbeiroId) => {
        try {
            const response = await api.get(`/servicos/listar/${barbeiroId}`);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços do barbeiro:', error);
        }
    };

    const handleSchedule = async (e) => {
        e.preventDefault();
    
        if (!clienteId || !barbeiroId || !servicoId || !selectedDate || !selectedTime) {
            setModalTitle("Erro");
            setModalMessage("Todos os campos devem ser preenchidos.");
            setIsErrorModalOpen(true);
            return;
        }
    
        try {
            await api.post('/api/agendar', {
                data: selectedDate.toISOString().split('T')[0],
                horario: selectedTime,
                cliente: { id: clienteId },  
                barbeiro: { id: barbeiroId },
                servico: { id: servicoId }
            });

            setModalTitle("Agendamento Confirmado!");
            setModalMessage(`Seu agendamento foi realizado com sucesso.`);
            setIsSuccessModalOpen(true);

            setSelectedDate(null);
            setSelectedTime('');
            setBarbeiroId(null);
            setServicoId(null);
        } catch (error) {
            setModalTitle("Erro no Agendamento");
            setModalMessage("Não foi possível realizar o agendamento. Tente novamente.");
            setIsErrorModalOpen(true);
        }
    };

    const toggleMode = async () => {
        setIsCancelMode(!isCancelMode);

        if (!isCancelMode) {
            fetchAgendamentos();
        }
    };

    const fetchAgendamentos = async () => {
        try {
            const response = await api.get(`/api/agendamentos-cliente/${clienteId}`);
            const now = new Date();
    
            const filteredAgendamentos = response.data
                .map(agendamento => ({
                    ...agendamento,
                    datetime: new Date(`${agendamento.data}T${agendamento.horario}`)
                }))
                .filter(agendamento => agendamento.datetime > now) // Filtra agendamentos passados
                .sort((a, b) => a.datetime - b.datetime); // Ordena por data e hora crescentes
    
            setAgendamentos(filteredAgendamentos);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        }
    }    

    const handleCancel = async (agendamentoId, agendamentoDataHora) => {
        const now = new Date();
        const diffInHours = (agendamentoDataHora - now) / 1000 / 3600;

        if (diffInHours < 24) {
            setModalTitle("Erro ao Cancelar");
            setModalMessage("Não é possível cancelar um agendamento com menos de 24 horas de antecedência.");
            setIsErrorModalOpen(true);
            return;
        }

        try {
            await api.delete(`/api/agendamentos/${agendamentoId}`);
            setModalTitle("Agendamento Cancelado");
            setModalMessage("Seu agendamento foi cancelado com sucesso.");
            setIsSuccessModalOpen(true);
            fetchAgendamentos();
        } catch (error) {
            setModalTitle("Erro ao Cancelar");
            setModalMessage("Não foi possível cancelar o agendamento. Tente novamente.");
            setIsErrorModalOpen(true);
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <div className="w-full max-w-screen-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#111827] text-center mb-6">
                    {isCancelMode ? "Cancelar Agendamento" : "Agendar Horário"}
                </h1>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        className={`p-3 rounded-md text-white font-semibold transition ${isCancelMode ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                        onClick={() => setIsCancelMode(false)}
                    >
                        Agendar Horário
                    </button>
                    <button
                        className={`p-3 rounded-md text-white font-semibold transition ${isCancelMode ? "bg-red-500 hover:bg-red-600" : "bg-gray-400"}`}
                        onClick={toggleMode}
                    >
                        Cancelar Agendamento
                    </button>
                </div>

                {isCancelMode ? (
                    <div>
                        {agendamentos.length > 0 ? (
                            agendamentos.map((agendamento) => (
                                <div key={agendamento.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center mb-4">
                                    <div>
                                        <h4 className="font-bold text-[#111827]">{agendamento.servico?.nome}</h4>
                                        <p className="text-gray-600">Data: {agendamento.data}</p>
                                        <p className="text-gray-600">Horário: {agendamento.horario}</p>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleCancel(agendamento.id, agendamento.datetime)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center">Nenhum agendamento encontrado.</p>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSchedule} className="flex flex-col gap-6">
                    {/* 🔹 Escolha do Barbeiro */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-2">Escolha o barbeiro:</label>
                        <select
                            value={barbeiroId || ''}
                            onChange={(e) => setBarbeiroId(Number(e.target.value))}
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-500 text-sm"
                        >
                            <option value="">Selecione um barbeiro</option>
                            {barbeiros.map((barbeiro) => (
                                <option key={barbeiro.id} value={barbeiro.id}>
                                    {barbeiro.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 🔹 Escolha do Serviço (liberado após escolher o barbeiro) */}
                    {barbeiroId && (
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Escolha o serviço:</label>
                            <select
                                value={servicoId || ''}
                                onChange={(e) => setServicoId(Number(e.target.value))}
                                className="outline-none shadow-md rounded-md p-2 w-full text-gray-500 text-sm"
                            >
                                <option value="">Selecione um serviço</option>
                                {servicos.map((servico) => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome} - R$ {servico.preco}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* 🔹 Escolha da Data (liberado após escolher o serviço) */}
                    {servicoId && (
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Escolha a data:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="outline-none shadow-md rounded-md p-2 w-full text-gray-500 text-sm"
                                placeholderText="Selecione uma data"
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    )}

                    {/* 🔹 Escolha do Horário (liberado após escolher a data) */}
                    {selectedDate && (
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">Escolha o horário:</label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="outline-none shadow-md rounded-md p-2 w-full text-gray-500 text-sm"
                            >
                                <option value="">Selecione o horário</option>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Nenhum horário disponível
                                    </option>
                                )}
                            </select>
                        </div>
                    )}

                    {/* 🔹 Botão de confirmação */}
                    <div className="flex justify-center">
                        <ConfirmButton label="Confirmar Agendamento" />
                    </div>
                </form>
                )}
            </div>

            <ErrorModal open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title={modalTitle} message={modalMessage} />
            <ErrorModal open={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} title={modalTitle} message={modalMessage} />
        </div>
    );
};
