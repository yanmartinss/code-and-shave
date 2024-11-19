import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CadastroBarbearia } from './pages/LoginFormularios/CadastroBarbearia';
import { CadastroCliente } from './pages/LoginFormularios/CadastroCliente';
import { LoginFormulario } from './pages/LoginFormularios/LoginFormulario';
import { Form } from './components/container/Form';
import { AuthProvider } from './contexts/AuthContext';
import { Principal } from './components/container/Principal';
import { HomeCliente } from './pages/TelasCliente/HomeCliente';
import { ClienteRoute, BarbeariaRoute } from './utils/PrivateRoute';
import { HomeBarbearia } from './pages/TelasBarberia/HomeBarbearia';

function App() {
  return (
      <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Form />}>
            <Route path="/" element={<LoginFormulario />} />
            <Route path="/cadastro-barbearia" element={<CadastroBarbearia />} />
            <Route path="/cadastro-cliente" element={<CadastroCliente />} />
          </Route>
          <Route element={<Principal />}>
            <Route path="/home-cliente" element={<ClienteRoute><HomeCliente /></ClienteRoute>} />
            <Route path="/home-barbearia" element={<BarbeariaRoute><HomeBarbearia /></BarbeariaRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;