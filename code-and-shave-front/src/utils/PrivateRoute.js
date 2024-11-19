import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export const ClienteRoute = ({children}) => {
    // const {usuarioLogado} = useAuth();
    // const navigate = useNavigate();

    // if (!usuarioLogado) return navigate("/");
    // usuarioLogado.tipo = 'cliente';

    // if (usuarioLogado.tipo === "cliente") return navigate("/home-cliente");

    return children;
}

export const BarbeariaRoute = ({children}) => {
    const {usuarioLogado} = useAuth();
    const navigate = useNavigate();

    if (!usuarioLogado) return navigate("/");
    usuarioLogado.tipo = 'barbearia';


    if (usuarioLogado.tipo === "barbearia") return navigate("/home-barbearia");

    return children;
}