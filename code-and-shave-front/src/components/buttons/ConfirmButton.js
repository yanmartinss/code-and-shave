export const ConfirmButton = ({label}) => {
    return (
        <div>
            <input type="submit" value={label}
            className='bg-black text-white px-7 py-2 rounded-lg cursor-pointer' />
        </div>
    );  
}