import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const HomeCliente = () => {

    const {userLogged} = useAuth();
    const [barberInput, setBarberInput] = useState();
    const [localInput, setLocalInput] = useState();
    const [userLocation, setUserLocation] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
                // {fetchBarbeariasByLocation(latitude, longitude); // Buscar barbearias próximas}
                console.log(`${latitude}, ${longitude}`)
            });
        } else {
            alert("Digite seu endereço por favor.");
        }
    };

    return (
        <div>
            <div className='grid gap-5 w-full'>
                <div className='grid gap-2 lg:grid-cols-2'>
                    <div className='bg-black/90 flex justify-between rounded-2xl px-7 py-3 gap-3'>
                        <input
                        className="outline-none bg-transparent text-white/90 placeholder:text-white/90 flex-1"
                        type="text"
                        placeholder="Encontre sua barbearia favorita"
                        value={barberInput}
                        onChange={e => setBarberInput(e.target.value)} />
                        <button><SearchIcon sx={{color: '#e0dfdf'}} /></button>
                    </div>
                
                    <div className='bg-black/90 flex justify-between rounded-2xl px-7 py-3 gap-3'>
                        <input
                        className="outline-none bg-transparent text-white/90 placeholder:text-white/90 flex-1"
                        type="text"
                        placeholder="Onde você está?"
                        value={localInput}
                        onChange={e => setLocalInput(e.target.value)} />
                        <button onClick={getLocation}><GpsFixedIcon sx={{color: '#e0dfdf'}} /></button>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {/* BARBEARIAS APARECEM AQUI COM A API */}
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                    <div className='bg-black h-[150px] w-full rounded-xl'></div>
                </div>
            </div>
        </div>
    );  
}