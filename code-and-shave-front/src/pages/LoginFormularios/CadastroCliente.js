import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import photoImage from '../../assets/images/photo-login.jpg';
import { ConfirmButton } from '../../components/buttons/ConfirmButton';
import { formatPhone, validateEmail, validatePassword } from '../../utils/functions';
import { ErrorModal } from '../../components/modals/ErrorModal';

export const CadastroCliente = () => {
    const navigate = useNavigate();

    const [typePassword, setTypePassword] = useState('password');
    const [typeConfirmPassword, setConfirmTypePassword] = useState('password');
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const [modalError, setModalError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const switchTypePassword = (e, item, set) => {
        e.preventDefault();
        set(item === 'password' ? 'text' : 'password');
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalError('');
    }

    const validateForm = () => {
        const validations = [
            { valid: validateEmail(emailInput), message: "Por favor, insira um email válido." },
            { valid: nameInput.trim() !== '', message: "Nome não pode estar vazio." },
            { valid: phoneInput.trim() !== '', message: "Telefone não pode estar vazio." },
            { valid: /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phoneInput), message: "Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX." },
            { valid: validatePassword(passwordInput), message: "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais." },
            { valid: passwordInput === confirmPasswordInput, message: "As senhas não coincidem." }
        ];

        const invalid = validations.find(v => !v.valid);
        if (invalid) {
            setModalError(invalid.message);
            setModalOpen(true);
            return false;
        }
        return true;
    }

    const handlePhoneChange = (e) => setPhoneInput(formatPhone(e.target.value));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formattedPhone = phoneInput.replace(/\D/g, '');

            const formData = new FormData();
            formData.append('email', emailInput);
            formData.append('nome', nameInput);
            formData.append('telefone', formattedPhone);
            if (profilePhoto) formData.append('fotoPerfil', profilePhoto);
            formData.append('senha', passwordInput);

            console.log('Dados enviados para o backend:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Código de envio de dados ao backend (descomente para uso)
            // try {
            //     const response = await fetch('https://sua-api.com/endpoint-de-cadastro', {
            //         method: 'POST',
            //         body: formData
            //     });
            //     if (!response.ok) {
            //         throw new Error('Erro no cadastro. Tente novamente.');
            //     }
            //     const data = await response.json();
            //     console.log('Cadastro realizado com sucesso:', data);
            // } catch (error) {
            //     console.error('Erro ao enviar os dados:', error);
            //     setModalError('Erro no envio dos dados. Tente novamente.');
            //     setModalOpen(true);
            // }
        }
    }

    return (
        <div className="bg-[#24211c] min-h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black/90 to-black/40">
            <div className="bg-white w-screen h-auto md:h-[580px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all">
                <div
                    style={{ backgroundImage: `url(${photoImage})` }}
                    className="h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]"
                ></div>
                <div className="p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]">
                    <h2 className="text-2xl font-bold mb-1 md:text-2xl lg:text-3xl">Code & Shave 💈</h2>
                    <p className="text-gray-600 mb-1 max-w-[300px] text-sm md:text-base">
                        Sistema de agendamento fácil e rápido para barbearias e clientes.
                    </p>
                    <h1 className="font-bold text-lg md:text-xl lg:text-2xl mt-2 mb-2">Cadastro - Cliente</h1>
                    <div className="overflow-y-auto py-2">
                        <form className="mt-4 flex flex-col justify-center gap-3 md:w-[361px]" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Email</label>
                                <input
                                    type="text"
                                    autoComplete="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="Digite seu email"
                                    className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Nome e Sobrenome</label>
                                <input
                                    type="text"
                                    placeholder="Digite seu nome e sobrenome"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Telefone</label>
                                <input
                                    type="text"
                                    placeholder="Digite seu número"
                                    value={phoneInput}
                                    onChange={handlePhoneChange}
                                    className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm">Foto de Perfil (opcional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                                    className="outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm rounded-md">Senha</label>
                                <div className="shadow-lg p-2 w-full flex items-center">
                                    <input
                                        type={typePassword}
                                        placeholder="Digite sua senha"
                                        autoComplete="new-password"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        className="outline-none bg-transparent text-gray-500 flex-grow text-sm"
                                    />
                                    <button onClick={(e) => switchTypePassword(e, typePassword, setTypePassword)}>
                                        {typePassword === 'password' ? (
                                            <VisibilityIcon sx={{ color: '#6B7280' }} />
                                        ) : (
                                            <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-left text-gray-500 text-sm rounded-md">Confirmar Senha</label>
                                <div className="shadow-lg p-2 w-full flex items-center">
                                    <input
                                        type={typeConfirmPassword}
                                        placeholder="Confirme sua senha"
                                        autoComplete="new-password"
                                        value={confirmPasswordInput}
                                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                                        className="outline-none bg-transparent text-gray-500 flex-grow text-sm"
                                    />
                                    <button
                                        onClick={(e) => switchTypePassword(e, typeConfirmPassword, setConfirmTypePassword)}
                                    >
                                        {typeConfirmPassword === 'password' ? (
                                            <VisibilityIcon sx={{ color: '#6B7280' }} />
                                        ) : (
                                            <VisibilityOffIcon sx={{ color: '#6B7280' }} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <ConfirmButton label="Cadastrar" />
                        </form>

                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-gray-500 underline cursor-pointer" onClick={() => navigate('/')}>
                                Já tem Cadastro?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ErrorModal open={isModalOpen} onClose={closeModal} message={modalError} />
        </div>
    );
}