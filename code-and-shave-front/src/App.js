import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CadastroBarbearia } from './pages/LoginFormularios/CadastroBarbearia';
import { CadastroCliente } from './pages/LoginFormularios/CadastroCliente';
import { LoginFormulario } from './pages/LoginFormularios/LoginFormulario';
import { Form } from './components/container/Form';
import { AuthProvider } from './contexts/AuthContext';

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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;