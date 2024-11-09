"use client"

import { CadastroBarbearia } from "@/pages/CadastroBarbearia";
import { CadastroCliente } from "@/pages/CadastroCliente";
import { Login } from "@/pages/Login";

const Page = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Login />
    </div>
  );
}

export default Page;