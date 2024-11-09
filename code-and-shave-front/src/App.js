import { Route, Router, Routes } from "react-router-dom";
import { Form } from "./components/Form";
import { Login } from "./pages/FormularioInicial/Login"
import './index.css'

const App = () => {
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

export default App;