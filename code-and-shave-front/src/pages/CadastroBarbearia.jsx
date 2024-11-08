import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const CadastroBarbearia = () => {
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password) 
        );
    }

    const switchTypePassword = (e, item, set) => {
        e.preventDefault();
        set(item === 'password' ? 'text' : 'password');
    }

    const validateForm = () => {
        if (!validateEmail(emailInput)) {
            setModalError("Por favor, insira um email válido.");
            setModalOpen(true);
            return false;
        }

        if (nameInput.trim() === '') {
            setModalError("Nome não pode estar vazio.");
            setModalOpen(true);
            return false;
        }

        if (phoneInput.trim() === '') {
            setModalError("Telefone não pode estar vazio.");
            setModalOpen(true);
            return false;
        } else if (!/^\d{10,11}$/.test(phoneInput)) {
            setModalError("Telefone deve conter 10 ou 11 dígitos.");
            setModalOpen(true);
            return false;
        }

        if (!validatePassword(passwordInput)) {
            setModalError("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
            setModalOpen(true);
            return false;
        }

        if (passwordInput !== confirmPasswordInput) {
            setModalError("As senhas não coincidem.");
            setModalOpen(true);
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Cadastro realizado com sucesso!");
            // Aqui você pode adicionar o código para enviar os dados para o backend
        }
    }

    return (
        <div className='bg-[#24211c] min-h-screen w-screen flex justify-center items-center p-3 bg-gradient-to-b from-black/90 to-black/40'>
            <div className='bg-white w-[390px] h-auto md:h-[580px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all'>
                <div className='bg-[url("../assets/images/photo-login.jpg")] h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]'></div>

                <div className='p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]'>
                    <h2 className='text-2xl font-bold mb-1 md:text-2xl lg:text-3xl'>Code & Shave 💈</h2>
                    <p className='text-gray-600 mb-1 max-w-[300px] text-sm md:text-base'>Sistema de agendamento fácil e rápido para barbearias e clientes.</p>
                    <h1 className='font-bold text-lg md:text-xl lg:text-2xl mt-2'>Cadastro - Barbearia</h1>

                    <div className='overflow-y-auto'>
                        <form className='mt-4 flex flex-col justify-center gap-3' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Email</label>
                                <input type="email"
                                autoComplete='email'
                                value={emailInput}
                                onChange={e => setEmailInput(e.target.value)}
                                placeholder='Digite seu email'
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Nome da Barbearia</label>
                                <input type="text"
                                placeholder='Digite seu nome'
                                value={nameInput}
                                onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Descrição da barbearia (opcional)</label>
                                <textarea
                                rows={2.5}
                                placeholder='Breve Descrição'
                                // value={nameInput}
                                // onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm'></textarea>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>CEP</label>
                                <input type="text"
                                placeholder='Digite seu CEP'
                                // value={nameInput}
                                // onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Rua</label>
                                <input type="text"
                                placeholder='Digite sua rua'
                                // value={nameInput}
                                // onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Número</label>
                                <input type="text"
                                placeholder='Digite o número'
                                // value={nameInput}
                                // onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Bairro</label>
                                <input type="text"
                                placeholder='Digite seu bairro'
                                // value={nameInput}
                                // onChange={e => setNameInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex items-start justify-between gap-3'>
                                <div className='flex flex-col w-[40px]'>
                                    <label className='text-left text-gray-500 text-sm'>UF</label>
                                    <select className='shadow-lg'>
                                        {/* AQUI VAI A API QUE PEGA OS ESTADOS */}
                                    </select>
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <label className='text-left text-gray-500 text-sm'>Cidade</label>
                                    <select className='shadow-lg'>
                                        {/* AQUI VAI A API QUE DE ACORDO COM OS ESTADOS MOSTRA A CIDADE */}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Telefone</label>
                                <input type="text"
                                placeholder='Digite seu telefone'
                                value={phoneInput}
                                onChange={e => setPhoneInput(e.target.value)}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Foto de Perfil (opcional)</label>
                                <input type="file"
                                accept="image/*"
                                onChange={e => setProfilePhoto(e.target.files[0])}
                                className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm rounded-md'>Senha</label>
                                <div className='shadow-lg p-2 w-full flex items-center'>
                                    <input type={typePassword}
                                    placeholder='Digite sua senha'
                                    autoComplete='new-password'
                                    value={passwordInput}
                                    onChange={e => setPasswordInput(e.target.value)}
                                    className='outline-none bg-transparent text-gray-500 flex-grow text-sm' />
                                    <button onClick={e => switchTypePassword(e, typePassword, setTypePassword)}>
                                        {typePassword === 'password' ?
                                        <VisibilityIcon sx={{color: '#6B7280'}} />
                                        : <VisibilityOffIcon  sx={{color: '#6B7280'}} />}
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm rounded-md'>Confirmar Senha</label>
                                <div className='shadow-lg p-2 w-full flex items-center'>
                                    <input type={typeConfirmPassword}
                                    placeholder='Confirme sua senha'
                                    autoComplete='new-password'
                                    value={confirmPasswordInput}
                                    onChange={e => setConfirmPasswordInput(e.target.value)}
                                    className='outline-none bg-transparent text-gray-500 flex-grow text-sm' />
                                    <button onClick={e => switchTypePassword(e, typeConfirmPassword, setConfirmTypePassword)}>
                                        {typeConfirmPassword === 'password' ?
                                        <VisibilityIcon sx={{color: '#6B7280'}} />
                                        : <VisibilityOffIcon  sx={{color: '#6B7280'}} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <input type="submit" value="Cadastrar"
                                className='bg-black text-white px-7 py-2 rounded-md cursor-pointer' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>Erro de Validação</DialogTitle>
                <DialogContent>
                    <DialogContentText>{modalError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} sx={{color: 'black'}}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}