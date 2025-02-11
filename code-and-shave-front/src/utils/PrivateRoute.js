import { Navigate } from "react-router-dom";
import { getUserFromToken, isTokenValid } from "../utils/auth";

export const ClienteRoute = ({ children }) => {
    const usuario = getUserFromToken();
    console.log("Usuário no ClienteRoute:", usuario); // 🔹 Verifica se o usuário está sendo identificado

    if (!isTokenValid() || !usuario || usuario.tipo !== "cliente") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export const BarbeariaRoute = ({ children }) => {
    const usuario = getUserFromToken();
    console.log("Usuário no BarbeariaRoute:", usuario); // 🔹 Verifica se o usuário está sendo identificado

    const tokenValido = isTokenValid();

    if (tokenValido === null) {
        return <div>Carregando...</div>; // 🟢 Aguarda a verificação antes de redirecionar
    }

    if (!tokenValido || !usuario || usuario.tipo !== "barbearia") {
        return <Navigate to="/" replace />;
    }


    return children;
}