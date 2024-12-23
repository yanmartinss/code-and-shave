import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            setUsuarioLogado(JSON.parse(usuarioSalvo));
        }
    }, []);

    const login = (usuario) => {
        setUsuarioLogado(usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }

    const logout = () => {
        setUsuarioLogado(null);
        localStorage.removeItem('usuarioLogado');
    }

    return (
        <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);