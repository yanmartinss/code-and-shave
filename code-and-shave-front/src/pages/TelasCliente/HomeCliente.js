import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export const HomeCliente = () => {

    const [barberInput, setBarberInput] = useState();
    const slides = [
        // IMAGENS PRECISAM TER O MESMO TAMANHO
        "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/06/corte-de-cabelo-masculino.webp",
        "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/06/corte-de-cabelo-masculino.webp",
        "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/06/corte-de-cabelo-masculino.webp",
        "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/06/corte-de-cabelo-masculino.webp",
        "https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2023/06/corte-de-cabelo-masculino.webp",
    ]

    return (
        <div className='flex justify-center items-center'>
            <div className='grid gap-5 w-full max-w-4xl'>
                <div className='grid gap-2'>
                    <div className='bg-black/90 flex justify-between rounded-2xl px-7 py-3 gap-3'>
                        <input
                        className="outline-none bg-transparent text-white/90 placeholder:text-white/90 flex-1 h-[42px]"
                        type="text"
                        placeholder="Encontre seu barbeiro favorito"
                        value={barberInput}
                        onChange={e => setBarberInput(e.target.value)} />
                        <button><SearchIcon sx={{color: '#e0dfdf'}} /></button>
                    </div>
                </div>
            </div>
        </div>
    );  
}