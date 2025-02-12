import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import photoImage from '../../assets/images/photo-login.jpg';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { validateEmail } from '../../utils/functions';
import { ErrorModal } from '../../components/modals/ErrorModal';

export const RecuperarSenha = () => {
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState('');
    const [modalError, setModalError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
        setModalError('');
    }

    const sendEmail = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(emailInput)) {
            setModalError('Por favor, insira um email válido.');
            setModalOpen(true);
            return;
        }
    
        setIsLoading(true);
    
        try {
            const response = await fetch('http://localhost:8080/password/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailInput }),
            });

            let message = 'Se este email estiver cadastrado, você receberá um link para redefinir sua senha.';

            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Erro ao enviar email.');
                }
            } else {
                const text = await response.text();
                if (!response.ok) {
                    throw new Error(text || 'Erro ao enviar email.');
                }
            }

            setModalError(message);
            setModalOpen(true);
        } catch (error) {
            setModalError(error.message || 'Erro ao enviar email. Tente novamente mais tarde.');
            setModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="px-2 bg-[#24211c] min-h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black/90 to-black/40">
            <div className="bg-white w-screen h-auto md:h-[580px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all">
                <div
                    style={{ backgroundImage: `url(${photoImage})` }}
                    className="h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]"
                ></div>
                <div className="p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]">
                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl mt-2">Recuperar Senha</h1>
                    <div className="overflow-y-auto py-2">
                        <form className="mt-4 flex flex-col justify-center gap-3 md:w-[361px]" onSubmit={sendEmail}>
                            <p className="text-gray-600 mb-1 text-sm md:text-base">
                                Se este email estiver cadastrado, enviaremos um link para redefinir sua senha.
                            </p>
                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Email</label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="Digite seu email"
                                    className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm"
                                    disabled={isLoading}
                                />
                            </div>
                            <ConfirmButton label={isLoading ? 'Enviando...' : 'Enviar'} disabled={isLoading} />
                            <div>
                                <p
                                    className="text-gray-600 mb-1 text-sm md:text-base underline cursor-pointer"
                                    onClick={() => navigate('/')}
                                >
                                    Voltar
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ErrorModal title={"Recuperação de senha"} open={isModalOpen} onClose={closeModal} message={modalError} />
        </div>
    );
}