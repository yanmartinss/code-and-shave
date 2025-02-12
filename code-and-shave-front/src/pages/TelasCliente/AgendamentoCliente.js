import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import api from '../../services/axiosInstance';

export const AgendamentoCliente = () => {
    const [selectedDate, setSelectedDate] = useState(null); 
    const [selectedTime, setSelectedTime] = useState(''); 
    const [availableTimes, setAvailableTimes] = useState([]); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    
    const fetchAvailableTimes = async (date) => {
        if (!date) return;

        try {
            const response = await api.get(`/api/horarios-disponiveis`, {
                params: { date: date.toISOString().split('T')[0] }, 
            });

            setAvailableTimes(response.data); 
        } catch (error) {
            setErrorMessage('Não foi possível carregar os horários disponíveis. Tente novamente.');
            console.error('Erro ao buscar horários disponíveis:', error);
        }
    }

    
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        } else {
            setAvailableTimes([]); 
        }
    }, [selectedDate]);

    
    const handleSchedule = async (e) => {
        e.preventDefault();

        if (!selectedDate || !selectedTime) {
            setErrorMessage('Por favor, selecione uma data e horário.');
            return;
        }

        try {
            const response = await api.post('/api/agendar', {
                date: selectedDate.toISOString().split('T')[0],
                time: selectedTime,
            });

            setSuccessMessage(response.data.message || 'Agendamento realizado com sucesso!');
            setSelectedDate(null);
            setSelectedTime('');
        } catch (error) {
            setErrorMessage('Não foi possível realizar o agendamento. Tente novamente.');
            console.error('Erro ao realizar o agendamento:', error);
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <div className="w-full max-w-screen-md bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#111827] text-center mb-6">Agendar Horário</h1>

                <form onSubmit={handleSchedule} className="flex flex-col gap-6">
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

                    <div className="flex justify-center">
                        <ConfirmButton label="Confirmar Agendamento" />
                    </div>
                </form>

                {successMessage && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}