import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SearchIcon from '@mui/icons-material/Search';

export const HomeCliente = () => {
    return (
        <div>
            <div className='grid gap-5 w-full'>
                <div className='grid gap-2 lg:grid-cols-2'>
                    <div className='bg-black/90 flex justify-between rounded-2xl px-7 py-3 gap-3'>
                        <input
                        className="outline-none bg-transparent text-white/90 placeholder:text-white/90 flex-1"
                        type="text"
                        placeholder="Encontre sua barbearia favorita"/>
                        <button><SearchIcon sx={{color: '#e0dfdf'}} /></button>
                    </div>
                
                    <div className='bg-black/90 flex justify-between rounded-2xl px-7 py-3 gap-3'>
                        <input
                        className="outline-none bg-transparent text-white/90 placeholder:text-white/90 flex-1"
                        type="text"
                        placeholder="Onde você está?"/>
                        <button><GpsFixedIcon sx={{color: '#e0dfdf'}} /></button>
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