import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import EditarProduto from './pages/EditarProduto';
import CadastroProduto from './pages/CadastroProduto';
import ImportacaoNF from './pages/ImportacaoNF';
import Usuarios from './pages/Usuarios';
import EditarUsuario from './pages/EditarUsuario';
import CadastroUsuario from './pages/CadastroUsuario';
import RequisicoesRecusadas from './pages/RequisicoesRecusadas';
import MonitoramentoRT from './pages/MonitoramentoRT';
import Setor from './pages/Setor';
import EditarSetor from './pages/EditarSetor';
import CadastroSetor from './pages/CadastroSetor';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/produtos" element={<Produtos />}></Route>
          <Route path="/editarProduto/:id" element={<EditarProduto />}></Route>
          <Route path="/editarUsuario/:id" element={<EditarUsuario />}></Route>
          <Route path="/editarSetor/:id" element={<EditarSetor />}></Route>
          <Route path="/cadastrarProduto" element={<CadastroProduto />}></Route>
          <Route path="/cadastrarUsuario" element={<CadastroUsuario />}></Route>
          <Route path="/cadastrarSetor" element={<CadastroSetor />}></Route>
          <Route path="/importacaoNF" element={<ImportacaoNF />}></Route>
          <Route path="/usuarios" element={<Usuarios />}></Route>
          <Route path="/requisicoesRecusadas" element={<RequisicoesRecusadas />}></Route>
          <Route path="/monitoramentoRT" element={<MonitoramentoRT />}></Route>
          <Route path="/setor" element={<Setor />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
