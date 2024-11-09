import { Form } from "@/components/Form";
import { IndexLayout } from "@/layouts/IndexLayout";
import { CadastroBarbearia } from "@/pages/CadastroBarbearia";
import { CadastroCliente } from "@/pages/CadastroCliente";
import { Login } from "@/pages/Login";
import { Route, Router, Routes } from "react-router-dom";

const Page = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Form />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Page;