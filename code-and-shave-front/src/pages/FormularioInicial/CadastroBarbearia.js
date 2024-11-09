import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { allCities, fetchCEPData } from '../api/dataAPI';
import { estados } from '../../assets/data/estados';

export const CadastroBarbearia = () => {
    const [typePassword, setTypePassword] = useState('password');
    const [typeConfirmPassword, setConfirmTypePassword] = useState('password');
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [streetInput, setStreetInput] = useState('');
    const [numInput, setNumInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [modalError, setModalError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [ufSelect, setUfSelect] = useState({ index: null, sigla: '' });
    const [cidadesEstado, setCidadesEstado] = useState(null);
    const [citySelect, setCitySelect] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const cepFormatado = cepInput.replace(/-/g, '').trim();
            if (cepFormatado.length === 8) {
                fetchCEPData(cepFormatado).then((data) => {
                    if (data) {
                        setStreetInput(data.logradouro || '');
                        setBairroInput(data.bairro || '');
                        const ufEncontrado = estados.find((estado) => estado.sigla === data.uf);
                        if (ufEncontrado) {
                            setUfSelect({
                                index: estados.findIndex((estado) => estado.sigla === data.uf),
                                sigla: ufEncontrado.sigla
                            });
                        }
                    }
                });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [cepInput]);

    useEffect(() => {
        if (ufSelect.sigla) {
            allCities(ufSelect.sigla).then((data) => {
                if (data) {
                    const cidadesOrdenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setCidadesEstado(cidadesOrdenadas);
                }
            });
        }
    }, [ufSelect]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    const validatePassword = (password) => (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );

    const switchTypePassword = (e, item, set) => {
        e.preventDefault();
        set(item === 'password' ? 'text' : 'password');
    }

    const validateForm = () => {
        const validations = [
            { condition: !validateEmail(emailInput), message: "Por favor, insira um email válido." },
            { condition: nameInput.trim() === '', message: "Nome não pode estar vazio." },
            { condition: phoneInput.trim() === '', message: "Telefone não pode estar vazio." },
            { condition: !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(phoneInput), message: "Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX." },
            { condition: !validatePassword(passwordInput), message: "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais." },
            { condition: passwordInput !== confirmPasswordInput, message: "As senhas não coincidem." },
            { condition: streetInput.trim() === '', message: "Endereço não pode estar vazio." },
            { condition: numInput.trim() === '', message: "Número não pode estar vazio." },
            { condition: bairroInput.trim() === '', message: "Bairro não pode estar vazio." },
            { condition: ufSelect.sigla === '', message: "UF deve ser selecionado." },
            { condition: citySelect === '', message: "Cidade deve ser selecionada." }
        ];

        for (const { condition, message } of validations) {
            if (condition) {
                setModalError(message);
                setModalOpen(true);
                return false;
            }
        }
        return true;
    }

    const handleUF = (e) => {
        const selectedSigla = e.target.value;
        setUfSelect({
            index: estados.findIndex(estado => estado.sigla === selectedSigla),
            sigla: selectedSigla
        });
    }

    const handleCepChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 5) {
            valor = valor.slice(0, 5) + '-' + valor.slice(5);
        }
        setCepInput(valor);
    }

    const handlePhoneChange = (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 10) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length > 6) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        setPhoneInput(valor);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const telefoneParaEnvio = phoneInput.replace(/\D/g, '');
            const cepParaEnvio = cepInput.replace(/\D/g, '');
            const dadosParaEnvio = {
                cep: cepParaEnvio,
                telefone: telefoneParaEnvio
            };
            console.log('Dados enviados para o backend:', dadosParaEnvio);
        }
    }

    return (
        <div className='bg-[#24211c] min-h-screen w-screen flex justify-center items-center bg-gradient-to-b from-black/90 to-black/40'>
            <div className='bg-white w-screen h-auto md:h-[580px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all'>
                {/* <div className='bg-[url("/assets/images/photo-login.jpg")] h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]'></div> */}
                
                <div className='p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]'>
                    <h2 className='text-2xl font-bold mb-1 md:text-2xl lg:text-3xl'>Code & Shave 💈</h2>
                    <p className='text-gray-600 mb-1 max-w-[300px] text-sm md:text-base'>Sistema de agendamento fácil e rápido para barbearias e clientes.</p>
                    <h1 className='font-bold text-lg md:text-xl lg:text-2xl mt-2 mb-2'>Cadastro - Barbearia</h1>
                    <div className='overflow-y-auto py-2'>
                        <form className='mt-4 flex flex-col justify-center gap-3 md:w-[361px]' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Email</label>
                                <input type="text" autoComplete='email' value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder='Digite seu email' className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Nome da Barbearia</label>
                                <input type="text" placeholder='Digite o nome da barbearia' value={nameInput} onChange={e => setNameInput(e.target.value)} className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Descrição da barbearia (opcional)</label>
                                <textarea rows={3} placeholder='Breve Descrição' className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm'></textarea>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>CEP (<a className='underline' href="https://buscacepinter.correios.com.br/app/endereco/index.php" target='_blank'>não sabe?</a>)</label>
                                <input type="text" placeholder='Digite seu CEP' value={cepInput} onChange={handleCepChange} className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex justify-between items-start'>
                                <div className='flex flex-col flex-1'>
                                    <label className='text-left text-gray-500 text-sm'>Endereço</label>
                                    <input type="text" placeholder='Digite seu endereço' value={streetInput} onChange={e => setStreetInput(e.target.value)} className='outline-none shadow-lg rounded-md p-2 text-gray-500 text-sm' />
                                </div>
                                <div className='flex flex-col w-[75px]'>
                                    <label className='text-left text-gray-500 text-sm'>Número</label>
                                    <input type="number" value={numInput} onChange={e => setNumInput(e.target.value)} className='outline-none shadow-lg rounded-md p-2 text-gray-500 text-sm' />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Bairro</label>
                                <input type="text" placeholder='Digite seu bairro' value={bairroInput} onChange={e => setBairroInput(e.target.value)} className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col md:flex-row items-start justify-between gap-3'>
                                <div className='flex flex-col w-[50px]'>
                                    <label className='text-left text-gray-500 text-sm'>UF</label>
                                    <select value={ufSelect.sigla || ''} className='text-gray-500' onChange={(e) => handleUF(e)}>
                                        <option value="" disabled></option>
                                        {estados.map((item, index) => (
                                            <option key={index} value={item.sigla}>{item.sigla}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col flex-1 w-full'>
                                    <label className='text-left text-gray-500 text-sm'>Cidade</label>
                                    <select value={citySelect} className='w-full shadow-lg outline-none text-gray-500' onChange={e => setCitySelect(e.target.value)}>
                                        <option value="" disabled></option>
                                        {cidadesEstado && cidadesEstado.map((item, index) => (
                                            <option key={index} value={item.nome}>{item.nome}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Telefone</label>
                                <input type="text" placeholder='Digite seu telefone' value={phoneInput} onChange={handlePhoneChange} className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm'>Foto de Perfil (opcional)</label>
                                <input type="file" accept="image/*" onChange={e => setProfilePhoto(e.target.files[0])} className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full text-sm' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm rounded-md'>Senha</label>
                                <div className='shadow-lg p-2 w-full flex items-center'>
                                    <input type={typePassword} placeholder='Digite sua senha' autoComplete='new-password' value={passwordInput} onChange={e => setPasswordInput(e.target.value)} className='outline-none bg-transparent text-gray-500 flex-grow text-sm' />
                                    <button onClick={e => switchTypePassword(e, typePassword, setTypePassword)}>
                                        {typePassword === 'password' ? <VisibilityIcon sx={{color: '#6B7280'}} /> : <VisibilityOffIcon sx={{color: '#6B7280'}} />}
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-left text-gray-500 text-sm rounded-md'>Confirmar Senha</label>
                                <div className='shadow-lg p-2 w-full flex items-center'>
                                    <input type={typeConfirmPassword} placeholder='Confirme sua senha' autoComplete='new-password' value={confirmPasswordInput} onChange={e => setConfirmPasswordInput(e.target.value)} className='outline-none bg-transparent text-gray-500 flex-grow text-sm' />
                                    <button onClick={e => switchTypePassword(e, typeConfirmPassword, setConfirmTypePassword)}>
                                        {typeConfirmPassword === 'password' ? <VisibilityIcon sx={{color: '#6B7280'}} /> : <VisibilityOffIcon sx={{color: '#6B7280'}} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <input type="submit" value="Cadastrar" className='bg-black text-white px-7 py-2 rounded-md cursor-pointer' />
                            </div>
                        </form>
                        <div className='flex flex-col gap-1 mt-2'>
                            <p className='text-gray-500 underline cursor-pointer'>Já tem Login?</p>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>Erro de Validação</DialogTitle>
                <DialogContent>
                    <DialogContentText>{modalError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} sx={{color: 'black'}}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}