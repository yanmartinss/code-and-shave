import VisibilityIcon from '@mui/icons-material/Visibility';

export const Login = () => {
    return (
        <div className='flex justify-center bg-[#0F1111] min-h-screen'>
            <div className='flex flex-col w-screen md:flex-row'>
                <div>
                    <div className='bg-[url("../assets/images/photo-login.jpg")] bg-cover bg-no-repeat bg-center h-72 md:w-72 md:h-full'></div>
                </div>

                <div className='bg-white flex flex-col items-center p-5 flex-1 gap-3 justify-center'>
                    <div className='flex flex-col justify-center gap-3 text-center'>
                        <h1 className='text-black font-bold text-3xl'>Code & Shave 💈</h1>
                        <p className='text-gray-600 md:w-80'>Sistema de agendamento fácil e rápido para barbearias e clientes.</p>
                    </div>
                    <div className='max-w-xs'>
                        <label className='text-gray-600 font-bold'>Email</label>
                        <input type="email"
                        className='shadow-sm outline-none p-1 text-gray-600 w-full rounded-md' />
                    </div>
                    <div className='max-w-xs'>
                        <label className='text-gray-600 font-bold'>Senha</label>
                        <div className='shadow-sm flex justify-between items-center p-1'>
                            <input type="password"
                            className='bg-transparent text-gray-600 rounded-md outline-none' />
                            <VisibilityIcon sx={{color: 'gray'}} />
                        </div>
                    </div>
                    <div className='flex max-w-xs'>
                        <input type="submit"
                        value="Login"
                        className='bg-blue-600 text-white px-8 py-3 rounded-md font-bold' />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <p className='text-gray-500 cursor-pointer'>Cadastrar-se como Cliente</p>
                        <p className='text-gray-500 cursor-pointer'>Cadastrar-se como Barbearia</p>
                    </div>
                </div>
            </div>
        </div>
    );
}