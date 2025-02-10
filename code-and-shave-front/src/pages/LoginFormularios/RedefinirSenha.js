import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import photoImage from '../../assets/images/photo-login.jpg';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { ErrorModal } from '../../components/modals/ErrorModal';

export const RedefinirSenha = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalError, setModalError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [typePassword, setTypePassword] = useState('password');
    const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

    const closeModal = () => {
        setModalOpen(false);
        setModalError('');
    }

    const switchTypePassword = (e) => {
        e.preventDefault();
        setTypePassword((prevType) => (prevType === 'password' ? 'text' : 'password'));
    }

    const switchTypeConfirmPassword = (e) => {
        e.preventDefault();
        setTypeConfirmPassword((prevType) => (prevType === 'password' ? 'text' : 'password'));
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            setModalError('A senha deve ter pelo menos 6 caracteres.');
            setModalOpen(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setModalError('As senhas não coincidem.');
            setModalOpen(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/password/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erro ao redefinir senha.');
            }

            setModalError('Senha redefinida com sucesso! Redirecionando para o login...');
            setModalOpen(true);

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setModalError(error.message || 'Erro ao redefinir senha. Tente novamente.');
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
                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl mt-2">Redefinir Senha</h1>
                    <div className="overflow-y-auto py-2">
                        <form className="mt-4 flex flex-col justify-center gap-3 md:w-[361px]" onSubmit={handleResetPassword}>
                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Nova Senha</label>
                                <div className="shadow-lg p-2 w-full flex items-center">
                                    <input
                                        type={typePassword}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Digite sua nova senha"
                                        className="outline-none bg-transparent text-gray-500 flex-grow"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={switchTypePassword}
                                        type="button"
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

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Confirmar Senha</label>
                                <div className="shadow-lg p-2 w-full flex items-center">
                                    <input
                                        type={typeConfirmPassword}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirme sua nova senha"
                                        className="outline-none bg-transparent text-gray-500 flex-grow"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={switchTypeConfirmPassword}
                                        type="button"
                                        className="focus:outline-none"
                                    >
                                        {typeConfirmPassword === 'password' ? (
                                            <VisibilityIcon sx={{ color: '#6B7280' }} />
                                        ) : (
                                            <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <ConfirmButton label={isLoading ? 'Redefinindo...' : 'Redefinir Senha'} disabled={isLoading} />
                        </form>
                    </div>
                </div>
            </div>
            <ErrorModal open={isModalOpen} onClose={closeModal} message={modalError} />
        </div>
    );
}