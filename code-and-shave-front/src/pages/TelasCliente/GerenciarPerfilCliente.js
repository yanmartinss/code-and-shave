import React, { useState, useEffect, useRef } from 'react';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { ErrorModal } from '../../components/modals/ErrorModal';
import api from '../../services/axiosInstance';
import { getUserFromToken } from '../../utils/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const GerenciarPerfilCliente = () => {
    const [perfil, setPerfil] = useState({
        nome: '',
        email: '', // Email será preenchido automaticamente
        telefone: '',
        endereco: '',
        descricao: '',
        senhaAtual: '',
        novaSenha: '',
        tipo: '',
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [redirectModalOpen, setRedirectModalOpen] = useState(false);
    const { usuarioLogado, setUsuarioLogado } = useAuth();
    const navigate = useNavigate();

    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);

    const user = getUserFromToken();
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (user && isInitialRender.current) {
            isInitialRender.current = false;

            setPerfil({
                nome: user.nome || '',
                email: user.sub || '', // Preenche o email do token
                telefone: formatarTelefone(user.telefone || ''),
                senhaAtual: '',
                novaSenha: '',
                tipo: user.tipo || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (redirectModalOpen) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [redirectModalOpen, navigate]);

    // Função para formatar telefone para exibição no input
    const formatarTelefone = (value) => {
        const numeroLimpo = value.replace(/\D/g, '').slice(0, 11); // Remove não dígitos e limita a 11 caracteres
        if (numeroLimpo.length <= 10) {
            return numeroLimpo.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            return numeroLimpo.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    };

    // Remove formatação antes de salvar no banco
    const limparTelefone = (telefone) => telefone.replace(/\D/g, '');

    // Função para validar o email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telefone') {
            setPerfil((prev) => ({ ...prev, telefone: formatarTelefone(value) }));
        } else {
            setPerfil((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // Validação do email
        if (!validarEmail(perfil.email)) {
            setModalTitle('Erro ao salvar');
            setModalMessage('Por favor, insira um email válido.');
            setModalOpen(true);
            return;
        }
    
        const dadosAtualizados = {
            id: usuarioLogado.id,
            nome: perfil.nome,
            email: perfil.email, // Email já está preenchido
            telefone: limparTelefone(perfil.telefone), // Remove formatação antes de salvar
            endereco: perfil.tipo === 'barbearia' ? perfil.endereco : '',
            descricao: perfil.tipo === 'barbearia' ? perfil.descricao : '',
            tipo: perfil.tipo,
        };
    
        try {
            const response = await api.put('/usuarios/alterar', dadosAtualizados);
            if (response.status === 200) {
                setModalTitle('Perfil atualizado');
                setModalMessage('Suas alterações foram salvas com sucesso. Você será redirecionado para a tela de login em 3 segundos.');
                setModalOpen(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error('❌ Erro ao atualizar perfil:', error);
            setModalTitle('Erro ao salvar');
            setModalMessage(error.response?.data?.erro || 'Ocorreu um erro ao tentar salvar os dados.');
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
            email: user.sub, // Usa o email do token
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

    return (
        <div className="flex flex-col items-center bg-[#f9fafb] min-h-screen p-4">
            <h1 className="text-2xl font-bold text-[#111827] mb-6">Gerenciar Perfil</h1>
            <div className="w-full max-w-4xl bg-white p-6 shadow-md rounded-lg">
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                        <input type="text" name="nome" value={perfil.nome} onChange={handleChange} className="outline-none shadow-md rounded-md p-2 w-full text-gray-700" />
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={perfil.email}
                            onChange={handleChange}
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                            readOnly // Impede que o usuário edite o email
                        />
                    </div> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={perfil.telefone}
                            onChange={handleChange}
                            maxLength="15" // Limite de 15 caracteres (incluindo formatação)
                            className="outline-none shadow-md rounded-md p-2 w-full text-gray-700"
                        />
                    </div>

                    {/* <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
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
                                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showSenhaAtual ? <VisibilityOffIcon sx={{ color: '#6B7280' }} /> : <VisibilityIcon sx={{ color: '#6B7280' }} />}
                                </button>
                            </div>
                        </div>
                    </div> */}

                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        {/* <button type="button" onClick={handleAlterarSenha} className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-center">
                            Alterar Senha
                        </button> */}
                        <ConfirmButton label="Salvar Alterações" className="w-full" />
                    </div>
                </form>
            </div>

            <ErrorModal open={isModalOpen} onClose={handleCloseModal} title={modalTitle} message={modalMessage} />
        </div>
    );
};