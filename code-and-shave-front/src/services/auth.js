import { jwtDecode } from "jwt-decode";


export const getToken = () => {
    return localStorage.getItem("token");
};


export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded); 
        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
};


export const isTokenValid = () => {
    const user = getUserFromToken();
    if (!user || !user.exp) return false;

    return user.exp > Date.now() / 1000; 
};