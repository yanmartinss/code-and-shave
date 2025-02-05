import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ErrorModal } from '../../components/modals/ErrorModal';
import { Button } from '@mui/material';

export const ClientesCadastrados = () => {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clienteToRemove, setClientToRemove] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuarios/listar');
                setClientes(response.data);
            } catch (error) {
                setError('Erro ao carregar os clientes. Tente novamente mais tarde.');
            }
        }
        fetchClientes();
    }, []);

    const confirmRemove = (id) => {
        setClientToRemove(id);
        setIsModalOpen(true);
    }

    const handleConfirm = async () => {
        if (clienteToRemove) {
            await removeClient(clienteToRemove);
        }
        setIsModalOpen(false);
        setClientToRemove(null);
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setClientToRemove(null);
    }

    const removeClient = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/remover/${id}`);
            setClientes((prevClientes) => prevClientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            setError('Erro ao excluir o cliente cadastrado. Tente novamente mais tarde.');
        }
    }

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#111827] text-center mb-6">Clientes Cadastrados</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clientes.length > 0 && clientes.some(cliente => cliente.tipo !== "barbearia") ? (
                        clientes.map((cliente) => (
                            cliente.tipo !== "barbearia" && (
                                <div
                                    key={cliente.id}
                                    className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                                >
                                    <h3>{cliente.tipo}</h3>
                                    <p className="text-sm text-gray-600">Email: {cliente.email}</p>
                                    <p className="text-sm text-gray-600">Telefone: {cliente.telefone}</p>

                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                            onClick={() => console.log(`Editar cliente ${cliente.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            onClick={() => confirmRemove(cliente.id)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <p className="text-gray-600 text-center w-full">Nenhum cliente cadastrado.</p>
                    )}
                </div>
            </div>

        <ErrorModal
            open={isModalOpen}
            onClose={handleClose}
            title="Confirmação"
            message="Deseja realmente continuar?"
        >
            <Button onClick={handleConfirm} sx={{ color: 'red' }}>
                Confirmar
            </Button>
            <Button onClick={handleClose} sx={{ color: 'black' }}>
                Cancelar
            </Button>
        </ErrorModal>

        </div>
    );
}