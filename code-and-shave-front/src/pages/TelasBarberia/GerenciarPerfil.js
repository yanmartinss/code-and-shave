import React, { useState, useEffect, useRef } from 'react';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { ErrorModal } from '../../components/modals/ErrorModal';
import api from '../../services/axiosInstance';
import { getUserFromToken } from '../../utils/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate para redirecionar

export const GerenciarPerfil = () => {
    const [perfil, setPerfil] = useState({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        descricao: '',
        senhaAtual: '', // Adicionado
        novaSenha: '',  // Adicionado
        tipo: '',
        horariosFuncionamento: []
    });

    const [novoHorario, setNovoHorario] = useState({
        dia: 'segunda',
        abertura: '',
        fechamento: ''
    });

    const [isEditing, setIsEditing] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [redirectModalOpen, setRedirectModalOpen] = useState(false); // Novo estado para o modal de redirecionamento
    const { usuarioLogado, setUsuarioLogado } = useAuth();
    const navigate = useNavigate(); // Hook para redirecionar

    // Estados para controlar a visibilidade da senha
    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);

    const user = getUserFromToken();
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (user && isInitialRender.current) {
            isInitialRender.current = false;

            console.log("🔍 Usuário autenticado:", user);
            setPerfil({
                nome: user.nome || '',
                email: user.sub || '',
                telefone: user.telefone || '',
                endereco: user.endereco || '',
                descricao: user.descricao || '',
                senhaAtual: '', // Inicializado como vazio
                novaSenha: '',  // Inicializado como vazio
                tipo: user.tipo || '',
                horariosFuncionamento: user.horarios_funcionamento || []
            });
        }
    }, [user]);

    // useEffect para redirecionar após 3 segundos
    useEffect(() => {
        if (redirectModalOpen) {
            const timer = setTimeout(() => {
                navigate('/'); // Redireciona para a página inicial
            }, 3000); // 3 segundos

            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
        }
    }, [redirectModalOpen, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prev) => ({ ...prev, [name]: value }));
    };

    const handleHorarioChange = (e) => {
        const { name, value } = e.target;
        setNovoHorario((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddHorario = () => {
        if (!novoHorario.abertura || !novoHorario.fechamento) {
            setModalTitle('Erro');
            setModalMessage('Preencha os horários antes de adicionar.');
            setModalOpen(true);
            return;
        }

        setPerfil((prev) => ({
            ...prev,
            horariosFuncionamento: [...prev.horariosFuncionamento, novoHorario]
        }));

        setNovoHorario({ dia: 'segunda', abertura: '', fechamento: '' });
    };

    const handleDeleteHorario = (index) => {
        setPerfil((prev) => ({
            ...prev,
            horariosFuncionamento: prev.horariosFuncionamento.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const dadosAtualizados = { ...perfil };

        if (!perfil.novaSenha.trim()) {
            delete dadosAtualizados.novaSenha;
        }

        if (perfil.horariosFuncionamento.length === 0) {
            delete dadosAtualizados.horariosFuncionamento;
        }

        console.log("📢 Enviando para o backend:", JSON.stringify(dadosAtualizados, null, 2));

        try {
            const response = await api.put('/usuarios/alterar', dadosAtualizados);
            if (response.status === 200) {
                setModalTitle('Perfil atualizado');
                setModalMessage('Suas alterações foram salvas com sucesso. Você será redirecionado para fazer login novamente em 3 segundos.');
                setModalOpen(true);

                
                const usuarioAtualizado = {
                    ...usuarioLogado,
                    nome: dadosAtualizados.nome,
                    telefone: dadosAtualizados.telefone,
                    endereco: dadosAtualizados.endereco,
                    descricao: dadosAtualizados.descricao,
                };

                setUsuarioLogado(usuarioAtualizado);
                localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado)); 

                
                setRedirectModalOpen(true);
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar perfil:', error);
            setModalTitle('Erro ao salvar');
            setModalMessage(error.response?.data?.mensagem || 'Ocorreu um erro ao tentar salvar os dados.');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalTitle('');
        setModalMessage('');
    };

    const handleAlterarSenha = async () => {
        const dadosSenha = {
            email: user.sub, 
            senhaAtual: perfil.senhaAtual,
            novaSenha: perfil.novaSenha 
        };

        try {
            const response = await api.put('/usuarios/alterar-senha', dadosSenha);
            if (response.status === 200) {
                setModalTitle('Senha alterada');
                setModalMessage('Sua senha foi alterada com sucesso.');
                setModalOpen(true);
                setPerfil((prev) => ({
                    ...prev,
                    senhaAtual: '',
                    novaSenha: ''
                }));
            }
        } catch (error) {
            console.error('❌ Erro ao alterar senha:', error);
            setModalTitle('Erro ao alterar senha');
            setModalMessage(error.response?.data?.erro || 'Ocorreu um erro ao tentar alterar a senha.');
            setModalOpen(true);
        }
    };

    
    const toggleShowSenhaAtual = () => {
        setShowSenhaAtual((prev) => !prev);
    };

    
    const toggleShowNovaSenha = () => {
        setShowNovaSenha((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <h1 className="text-2xl font-bold text-[#111827] mb-6">Gerenciar Perfil</h1>
            <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    {/* Campos do formulário */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                        <input type="text" name="nome" value={perfil.nome} onChange={handleChange} className="outline-none shadow-md rounded-md p-2 w-full text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <input type="text" name="telefone" value={perfil.telefone} onChange={handleChange} className="outline-none shadow-md rounded-md p-2 w-full text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                        <input type="text" name="endereco" value={perfil.endereco} onChange={handleChange} className="outline-none shadow-md rounded-md p-2 w-full text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                        <textarea name="descricao" value={perfil.descricao} onChange={handleChange} rows="3" className="outline-none shadow-md rounded-md p-2 w-full text-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                        <div className="relative">
                            <input
                                type={showSenhaAtual ? 'text' : 'password'}
                                name="senhaAtual"
                                value={perfil.senhaAtual}
                                onChange={handleChange}
                                className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                            />
                            <button
                                onClick={toggleShowSenhaAtual}
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showSenhaAtual ? (
                                    <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                ) : (
                                    <VisibilityIcon sx={{ color: '#6B7280' }} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                        <div className="relative">
                            <input
                                type={showNovaSenha ? 'text' : 'password'}
                                name="novaSenha"
                                value={perfil.novaSenha}
                                onChange={handleChange}
                                className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                            />
                            <button
                                onClick={toggleShowNovaSenha}
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showNovaSenha ? (
                                    <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                ) : (
                                    <VisibilityIcon sx={{ color: '#6B7280' }} />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleAlterarSenha}
                        className="bg-green-500 text-white p-2 rounded-md"
                    >
                        Alterar Senha
                    </button>
                    {/* Horários de funcionamento */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Horários de Funcionamento</label>
                        <div className="flex gap-2">
                            <select name="dia" value={novoHorario.dia} onChange={handleHorarioChange} className="outline-none shadow-md rounded-md p-2 text-gray-700">
                                <option value="segunda">Segunda-feira</option>
                                <option value="terca">Terça-feira</option>
                                <option value="quarta">Quarta-feira</option>
                                <option value="quinta">Quinta-feira</option>
                                <option value="sexta">Sexta-feira</option>
                                <option value="sabado">Sábado</option>
                                <option value="domingo">Domingo</option>
                            </select>
                            <input type="time" name="abertura" value={novoHorario.abertura} onChange={handleHorarioChange} className="outline-none shadow-md rounded-md p-2 text-gray-700" />
                            <input type="time" name="fechamento" value={novoHorario.fechamento} onChange={handleHorarioChange} className="outline-none shadow-md rounded-md p-2 text-gray-700" />
                            <button type="button" onClick={handleAddHorario} className="bg-blue-500 text-white p-2 rounded-md">Adicionar</button>
                        </div>
                        <ul>
                            {perfil.horariosFuncionamento.map((h, index) => (
                                <li key={index} className="text-gray-700 flex justify-between p-2 border-b">
                                    {h.dia}: {h.abertura} - {h.fechamento}
                                    <button onClick={() => handleDeleteHorario(index)} className="text-red-500">🗑 Remover</button>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    <ConfirmButton label="Salvar Alterações" />
                </form>
            </div>

            {/* Modal de redirecionamento */}
            <ErrorModal
                open={redirectModalOpen}
                onClose={() => setRedirectModalOpen(false)}
                title="Redirecionando..."
                message="Você será redirecionado para fazer login novamente em 3 segundos."
            />

            {/* Modal de erro/sucesso */}
            <ErrorModal open={isModalOpen} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </div>
    );
}