import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken, isTokenValid, getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = getToken();
            console.log("Token no AuthContext:", token); // 🔹 Verifica se está carregando o token

            if (isTokenValid()) {
                const user = getUserFromToken();
                console.log("Usuário autenticado:", user); // 🔹 Verifica o usuário extraído do token
                setUsuarioLogado(user);
            } else {
                logout(); // 🔹 Se o token não for válido, faz logout
            }
        };

        checkAuth();
    }, []);

    const login = (usuario, token) => {
        console.log("Chamando login do AuthContext...");
        localStorage.setItem("token", token);
        setUsuarioLogado(usuario);
    };

    const logout = () => {
        console.log("Fazendo logout...");
        localStorage.removeItem("token");
        setUsuarioLogado(null);
    };

    return (
        <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
