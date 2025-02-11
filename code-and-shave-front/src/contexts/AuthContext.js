import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken, isTokenValid, getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = getToken();
            console.log("📢 Token no AuthContext:", token);

            if (token && isTokenValid()) {
                const user = getUserFromToken();
                console.log("Usuário decodificado:", user); // Log para depuração
                if (user) {
                    console.log("✅ Usuário autenticado:", user);
                    setUsuarioLogado(user);
                } else {
                    console.error("⚠ Erro ao extrair usuário do token!");
                    logout();
                }
            } else {
                console.warn("❌ Token inválido ou expirado");
                logout();
            }
        };

        checkAuth();
    }, []);

    const login = (usuario, token) => {
        console.log("🔑 Chamando login no AuthContext...");
        localStorage.setItem("token", token);
        setUsuarioLogado(usuario);
    };

    const logout = () => {
        console.log("🚪 Fazendo logout...");
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