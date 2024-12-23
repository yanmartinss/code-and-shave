import React, { useState } from 'react';
import axios from 'axios';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { ErrorModal } from '../../components/modals/ErrorModal';
import { formatPhone, validateEmail } from '../../utils/functions';

export const GerenciarPerfil = () => {
    const [nomeBarbearia, setNomeBarbearia] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescricao] = useState('');
    const [horariosFuncionamento, setHorariosFuncionamento] = useState({});
    const [logo, setLogo] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [inputHorario, setInputHorario] = useState('');

    const diasSemana = [
        { id: 'segunda', label: 'Segunda-feira' },
        { id: 'terca', label: 'Terça-feira' },
        { id: 'quarta', label: 'Quarta-feira' },
        { id: 'quinta', label: 'Quinta-feira' },
        { id: 'sexta', label: 'Sexta-feira' },
        { id: 'sabado', label: 'Sábado' },
        { id: 'domingo', label: 'Domingo' },
    ];

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalTitle('');
        setModalMessage('');
    };

    const handleDaySelect = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSetHorario = () => {
        if (!inputHorario) {
            setModalTitle('Erro');
            setModalMessage('Por favor, insira um horário válido.');
            setModalOpen(true);
            return;
        }

        const novosHorarios = { ...horariosFuncionamento };
        selectedDays.forEach((day) => {
            novosHorarios[day] = inputHorario;
        });

        setHorariosFuncionamento(novosHorarios);
        setSelectedDays([]);
        setInputHorario('');
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setModalTitle('Erro ao salvar');
            setModalMessage('Por favor, insira um email válido.');
            setModalOpen(true);
            return;
        }

        // Montar o payload para envio ao backend
        const payload = {
            nomeBarbearia,
            endereco,
            telefone: formatPhone(telefone),
            email,
            descricao,
            horariosFuncionamento,
            logo, // Somente o arquivo
        };

        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (key === 'logo' && value) {
                    formData.append(key, value);
                } else if (key === 'horariosFuncionamento') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            const response = await axios.post('/api/barbearia/perfil', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setModalTitle('Informações salvas com sucesso');
                setModalMessage('As alterações foram salvas corretamente.');
                setModalOpen(true);
            }
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
            setModalTitle('Erro ao salvar');
            setModalMessage('Ocorreu um erro ao tentar salvar os dados. Tente novamente mais tarde.');
            setModalOpen(true);
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <h1 className="text-2xl font-bold text-[#111827] mb-6">Gerenciar Perfil</h1>

            <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Barbearia</label>
                        <input
                            type="text"
                            value={nomeBarbearia}
                            onChange={(e) => setNomeBarbearia(e.target.value)}
                            placeholder="Nome da barbearia"
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                        <input
                            type="text"
                            value={endereco}
                            placeholder="Rua Exemplo, 123"
                            onChange={(e) => setEndereco(e.target.value)}
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <input
                            type="text"
                            value={formatPhone(telefone)}
                            maxLength={15}
                            placeholder="(11) 99999-9999"
                            onChange={(e) => setTelefone(e.target.value)}
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contato@barbeariamodelo.com"
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="3"
                            placeholder="A melhor barbearia da cidade, com profissionais experientes e ambiente acolhedor."
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Horários de Funcionamento</label>
                        <div className="border rounded-md p-4 shadow-md">
                            <div className="grid grid-cols-2 gap-4">
                                {diasSemana.map((dia) => (
                                    <div key={dia.id}>
                                        <input
                                            type="checkbox"
                                            id={dia.id}
                                            checked={selectedDays.includes(dia.label)}
                                            onChange={() => handleDaySelect(dia.label)}
                                        />
                                        <label htmlFor={dia.id} className="ml-2 text-gray-700">
                                            {dia.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={inputHorario}
                                    onChange={(e) => setInputHorario(e.target.value)}
                                    placeholder="08:00-18:00"
                                    className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={handleSetHorario}
                                    className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                                >
                                    Definir Horário
                                </button>
                            </div>
                            <div className="mt-4">
                                {Object.entries(horariosFuncionamento).map(([day, hours]) => (
                                    <p key={day} className="text-gray-700">
                                        <strong>{day}:</strong> {hours}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogo(e.target.files[0])}
                            className="block w-full text-sm text-gray-500"
                        />
                        {logo && <p className="text-sm text-gray-600 mt-2">Arquivo selecionado: {logo.name}</p>}
                    </div>

                    <div className="flex justify-end">
                        <ConfirmButton label="Salvar Alterações" />
                    </div>
                </form>
            </div>

            <ErrorModal open={isModalOpen} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </div>
    );
}