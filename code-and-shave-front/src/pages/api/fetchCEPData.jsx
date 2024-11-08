import axios from "axios"

export const fetchCEPData = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.log(`cep invalido: ${error}`);
        return null;
    }
}