import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken, isTokenValid, getToken } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        const token = getToken();
        return token ? getUserFromToken() : null;
    });

    useEffect(() => {
        const checkAuth = () => {
            const token = getToken();
            if (token && isTokenValid()) {
                const user = getUserFromToken();
                setUsuarioLogado(user);
                localStorage.setItem("usuario", JSON.stringify(user)); // 🔥 Garante que o localStorage seja atualizado
            } else {
                setUsuarioLogado(null);
                localStorage.removeItem("usuario"); // 🔥 Remove do localStorage caso esteja inválido
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