import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export const ClienteRoute = ({children}) => {
    const { usuarioLogado } = useAuth();

    // Verifica se o usuário está logado e é do tipo 'cliente'
    if (!usuarioLogado || usuarioLogado.tipo !== "cliente") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export const BarbeariaRoute = ({children}) => {
    const { usuarioLogado } = useAuth();

    if (!usuarioLogado || usuarioLogado.tipo !== "barbearia") {
        return <Navigate to="/" replace />;
    }

    return children;
}