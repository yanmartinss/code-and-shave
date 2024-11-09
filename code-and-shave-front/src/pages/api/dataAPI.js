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

export const allCities = async (uf) => {
    try {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`);
        return response.data;
    } catch (error) {
        console.log(`erro na API: ${error}`);
        return null;
    }
}