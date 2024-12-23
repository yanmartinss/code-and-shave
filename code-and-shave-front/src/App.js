import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CadastroBarbearia } from './pages/LoginFormularios/CadastroBarbearia';
import { CadastroCliente } from './pages/LoginFormularios/CadastroCliente';
import { LoginFormulario } from './pages/LoginFormularios/LoginFormulario';
import { Form } from './components/container/Form';
import { AuthProvider } from './contexts/AuthContext';
import { HomeCliente } from './pages/TelasCliente/HomeCliente';
import { ClienteRoute, BarbeariaRoute } from './utils/PrivateRoute';
import { HomeBarbearia } from './pages/TelasBarberia/HomeBarbearia';
import MiniDrawer from './components/container/MiniDrawer';
import { AgendamentoCliente } from './pages/TelasCliente/AgendamentoCliente';
import { Favoritos } from './pages/TelasCliente/Favoritos';
import { Notificacoes } from './pages/TelasCliente/Notificacoes';
import { RecuperarSenha } from './pages/LoginFormularios/RecuperarSenha';
import { AgendamentoBarbearia } from './pages/TelasBarberia/AgendamentoBarbearia';
import { GestaoBarbearia } from './pages/TelasBarberia/GestaoBarbearia';
import { ClientesCadastrados } from './pages/TelasBarberia/ClientesCadastrados';
import { GerenciarPerfil } from './pages/TelasBarberia/GerenciarPerfil';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Form />}>
              <Route path="/" element={<LoginFormulario />} />
              <Route path="/recuperar-senha" element={<RecuperarSenha />} />
              <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            </Route>
            <Route element={<MiniDrawer />}>
              <Route path="/home-cliente" element={<ClienteRoute><HomeCliente /></ClienteRoute>} />
              <Route path="/agendamentos-cliente" element={<ClienteRoute><AgendamentoCliente /></ClienteRoute>} />
              <Route path='/favoritos' element={<ClienteRoute><Favoritos /></ClienteRoute>} />
              <Route path='/notificacoes-cliente' element={<ClienteRoute><Notificacoes /></ClienteRoute>} />
              
              <Route path="/home-barbearia" element={<BarbeariaRoute><HomeBarbearia /></BarbeariaRoute>} />
              <Route path="/agendamentos-barbearia" element={<BarbeariaRoute><AgendamentoBarbearia /></BarbeariaRoute>} />
              <Route path="/clientes-cadastrados" element={<BarbeariaRoute><ClientesCadastrados /></BarbeariaRoute>} />
              <Route path="/gestao-barbearia" element={<BarbeariaRoute><GestaoBarbearia /></BarbeariaRoute>} />
              <Route path='/perfil-barbearia' element={<BarbeariaRoute><GerenciarPerfil /></BarbeariaRoute>}/>
            </Route>
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;