import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [usuarioLogado, setUsuarioLogado] = useState(null);

    return (
        <AuthContext.Provider value={{usuarioLogado, setUsuarioLogado}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);