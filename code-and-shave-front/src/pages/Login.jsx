import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export const Login = () => {

    const [typePassword, setTypePassword] = useState('password');

    const switchTypePassword = (e) => {
        e.preventDefault();
        setTypePassword(typePassword === 'password' ? 'text' : 'password');
    }

    return (
        <div className='bg-[#24211c] min-h-screen w-screen flex justify-center items-center p-3 bg-gradient-to-b from-black/90 to-black/40'>
            <div className='bg-white w-[390px] h-[600px] rounded-md overflow-hidden shadow-sm md:w-[95vw] flex flex-col md:flex-row lg:flex-row-reverse justify-start lg:w-[900px] transition-all'>
                <div className='bg-[url("../assets/images/photo-login.jpg")] h-[230px] bg-cover flex justify-center items-center md:w-[40%] md:h-[100%] bg-center lg:w-[45%]'></div>

                <div className='p-3 flex flex-col justify-center items-center text-center md:w-[60%] lg:w-[55%]'>
                    <h2 className='text-2xl font-bold mb-1 md:text-2xl lg:text-3xl'>Code & Shave 💈</h2>
                    <p className='text-gray-600 mb-1 max-w-[300px] text-sm md:text-base'>Sistema de agendamento fácil e rápido para barbearias e clientes.</p>
                    <h1 className='font-bold text-lg md:text-xl lg:text-2xl mt-3'>Acesse sua conta</h1>

                    <form className='mt-5 flex flex-col justify-center gap-3'>
                        <div className='flex flex-col'>
                            <label className='text-left text-gray-500 text-sm'>Email</label>
                            <input type="email"
                            autoComplete='email'
                            placeholder='Digite seu email'
                            className='outline-none shadow-lg rounded-md p-2 text-gray-500 w-full' />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-left text-gray-500 text-sm rounded-md'>Senha</label>
                            <div className='shadow-lg p-2 w-full'>
                                <input type={typePassword}
                                placeholder='Digite sua senha'
                                autoComplete='password'
                                className='outline-none bg-transparent text-gray-500' />
                                <button onClick={e => switchTypePassword(e)}>
                                    {typePassword === 'password' ? <VisibilityIcon sx={{color: '#6B7280'}} /> : <VisibilityOffIcon  sx={{color: '#6B7280'}} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <input type="submit" value="Login"
                            className='bg-blue-500 text-white px-7 py-2 rounded-md cursor-pointer' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-gray-500 underline cursor-pointer'>Cadastrar-se como cliente</p>
                            <p className='text-gray-500 underline cursor-pointer'>Cadastrar-se como barbearia</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}