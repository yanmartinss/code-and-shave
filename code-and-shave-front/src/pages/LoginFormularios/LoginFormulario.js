import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { validateEmail } from '../../utils/functions';
import { ErrorModal } from '../../components/modals/ErrorModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import photoImage from '../../assets/images/photo-login.jpg';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@mui/material';
import axios from 'axios';
import api from '../../services/axiosInstance';
import { getUserFromToken } from '../../utils/auth';
import { jwtDecode } from "jwt-decode"; // Importando jwtDecode

export const LoginFormulario = () => {
    const navigate = useNavigate();

    const [typePassword, setTypePassword] = useState('password');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [modalError, setModalError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false); 
    const [usuarioDecodificado, setUsuarioDecodificado] = useState('');   

    const { setUsuarioLogado } = useAuth();

    const closeModal = () => {
        setModalOpen(false);
        setModalError('');
    }

    const switchTypePassword = (e) => {
        e.preventDefault();
        setTypePassword((prevType) => (prevType === 'password' ? 'text' : 'password'));
    }

    // REQUISIÇÃO REAL

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(emailInput) || !emailInput || !passwordInput) {
            setModalError("Preencha os campos corretamente.");
            setModalOpen(true);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                email: emailInput,
                senha: passwordInput,
            });
        
            if (response.status === 200) {
                const { token } = response.data;
                console.log("Token recebido:", token); // 🔍 Log para verificar se o token está vindo correto
                
                localStorage.setItem("token", token);
        
                const usuarioDecodificado = jwtDecode(token);
                console.log("Usuário decodificado:", usuarioDecodificado); // 🔍 Verifique o tipo
        
                setUsuarioLogado(usuarioDecodificado);
        
                // 🔄 Redirecionamento correto baseado no tipo
                if (usuarioDecodificado.tipo === "cliente") {
                    navigate("/home-cliente");
                } else if (usuarioDecodificado.tipo === "barbearia" || usuarioDecodificado.tipo === "admin") {
                    navigate("/home-barbearia");
                } else {
                    console.error("Tipo de usuário desconhecido:", usuarioDecodificado.tipo);
                    setModalError("Tipo de usuário inválido.");
                    setModalOpen(true);
                }
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setModalError(error.response?.data?.mensagem || "Usuário ou senha inválidos.");
            setModalOpen(true);
        }        
    }    

    return (
        <div className="bg-[#24211c] min-h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black/90 to-black/40">
            <div className="bg-white w-screen h-screen md:h-[580px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all">
                <div
                    style={{ backgroundImage: `url(${photoImage})` }}
                    className="h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]"
                ></div>

                <div className="p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]">
                    <h2 className="text-2xl font-bold mb-1 mt-9 md:text-2xl lg:text-3xl">Code & Shave 💈</h2>
                    <p className="text-gray-600 mb-1 max-w-[300px] text-sm md:text-base">
                        Sistema de agendamento fácil e rápido para barbearias e clientes.
                    </p>
                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl mt-3">Acesse sua conta</h1>

                    <form
                        className="mt-5 flex flex-col justify-center gap-3 w-[280px]"
                        onSubmit={handleLogin} // Handle login triggered by Enter or button click
                    >
                        <div className="flex flex-col">
                            <label className="text-left text-gray-500 text-sm">Email</label>
                            <input
                                type="text"
                                autoComplete="email"
                                placeholder="Digite seu email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-left text-gray-500 text-sm rounded-md">Senha</label>
                            <div className="shadow-lg p-2 w-full flex items-center">
                                <input
                                    type={typePassword}
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    className="outline-none bg-transparent text-gray-500 flex-grow"
                                />
                                <button
                                    onClick={switchTypePassword}
                                    type="button" // Ensures this button doesn't trigger form submission
                                    className="focus:outline-none"
                                >
                                    {typePassword === 'password' ? (
                                        <VisibilityIcon sx={{ color: '#6B7280' }} />
                                    ) : (
                                        <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <ConfirmButton label="Login" />

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-500 underline cursor-pointer" onClick={() => navigate('/recuperar-senha')}>
                                Esqueceu sua senha?
                            </p>
                            <p className="text-gray-500 underline cursor-pointer" onClick={() => navigate('/cadastro-cliente')}>
                                Cadastrar-se como cliente
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <ErrorModal open={isModalOpen} onClose={closeModal} message={modalError}>
                <Button onClick={closeModal} sx={{ color: 'black' }}>Fechar</Button>
            </ErrorModal>
        </div>
    );
}