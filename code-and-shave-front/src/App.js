import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { getUserFromToken, isTokenValid } from './utils/auth'; // 🔹 Certifique-se de importar essas funções

import { CadastroCliente } from './pages/LoginFormularios/CadastroCliente';
import { LoginFormulario } from './pages/LoginFormularios/LoginFormulario';
import { RecuperarSenha } from './pages/LoginFormularios/RecuperarSenha';
import { RedefinirSenha } from './pages/LoginFormularios/RedefinirSenha';

import { ClienteRoute, BarbeariaRoute } from './utils/PrivateRoute';
import MiniDrawer from './components/container/MiniDrawer';

import { HomeCliente } from './pages/TelasCliente/HomeCliente';
import { AgendamentoCliente } from './pages/TelasCliente/AgendamentoCliente';
import { Favoritos } from './pages/TelasCliente/Favoritos';
import { Notificacoes } from './pages/TelasCliente/Notificacoes';

import { HomeBarbearia } from './pages/TelasBarberia/HomeBarbearia';
import { AgendamentoBarbearia } from './pages/TelasBarberia/AgendamentoBarbearia';
import { ClientesCadastrados } from './pages/TelasBarberia/ClientesCadastrados';
import { GestaoBarbearia } from './pages/TelasBarberia/GestaoBarbearia';
import { GerenciarPerfil } from './pages/TelasBarberia/GerenciarPerfil';
import { ServicosBarbearia } from './pages/TelasBarberia/ServicosBarbearia';
import { EditarBarbeiros } from './pages/TelasBarberia/EditarBarbeiros';
// import { RelatorioBarbearia } from './pages/TelasBarberia/RelatorioBarbearia';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔹 Rotas Públicas (Sem Autenticação) */}
          <Route path="/" element={<LoginFormulario />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/reset-password" element={<RedefinirSenha />} />
          <Route path="/cadastro-cliente" element={<CadastroCliente />} />

          {/* 🔹 Rotas Protegidas para Usuários Autenticados */}
          {isTokenValid() !== false ? (  // 🟢 Só bloqueia se for explicitamente inválido
            <Route element={<MiniDrawer />}>
              {/* 🚀 Rotas para CLIENTES */}
              <Route path="/home-cliente" element={<ClienteRoute><HomeCliente /></ClienteRoute>} />
              <Route path="/agendamentos-cliente" element={<ClienteRoute><AgendamentoCliente /></ClienteRoute>} />
              <Route path="/favoritos" element={<ClienteRoute><Favoritos /></ClienteRoute>} />
              <Route path="/notificacoes-cliente" element={<ClienteRoute><Notificacoes /></ClienteRoute>} />

              {/* 🚀 Rotas para BARBEARIAS */}
              <Route path="/home-barbearia" element={<BarbeariaRoute><HomeBarbearia /></BarbeariaRoute>} />
              <Route path="/agendamentos-barbearia" element={<BarbeariaRoute><AgendamentoBarbearia /></BarbeariaRoute>} />
              <Route path="/clientes-cadastrados" element={<BarbeariaRoute><ClientesCadastrados /></BarbeariaRoute>} />
              <Route path="/gestao-barbearia" element={<BarbeariaRoute><GestaoBarbearia /></BarbeariaRoute>} />
              <Route path="/perfil-barbearia" element={<BarbeariaRoute><GerenciarPerfil /></BarbeariaRoute>} />
              <Route path="/servicos-barbearia" element={<BarbeariaRoute><ServicosBarbearia /></BarbeariaRoute>} />
              <Route path="/editar-barbeiros" element={<BarbeariaRoute><EditarBarbeiros /></BarbeariaRoute>} />
              {/* <Route path="/relatorios-barbeiros" element={<BarbeariaRoute><RelatorioBarbearia /></BarbeariaRoute>} /> */}
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;