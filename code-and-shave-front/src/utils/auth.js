import { jwtDecode } from "jwt-decode";

// 🔹 Obtém o token do localStorage
export const getToken = () => {
    return localStorage.getItem("token");
};

// 🔹 Decodifica o token JWT
export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
}

// 🔹 Verifica se o token é válido e não expirou
export const isTokenValid = () => {
    const user = getUserFromToken();
    if (!user || !user.exp) return false; // 🔄 Retorna `false` se não houver token

    const currentTime = Date.now() / 1000;
    return user.exp > currentTime; // ✅ Só retorna `true` se for válido
}