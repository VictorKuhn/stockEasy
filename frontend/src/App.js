import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Produtos from './pages/Produtos.js';
import EditarProduto from './pages/changes/EditarProduto.js';
import CadastroProduto from './pages/inserts/CadastroProduto.js';
import ImportacaoNF from './pages/ImportacaoNF.js';
import Usuarios from './pages/Usuarios.js';
import EditarUsuario from './pages/changes/EditarUsuario.js';
import CadastroUsuario from './pages/inserts/CadastroUsuario.js';
import RequisicoesRecusadas from './pages/RequisicoesRecusadas.js';
import MonitoramentoRT from './pages/MonitoramentoRT.js';
import Setor from './pages/Setor.js';
import EditarSetor from './pages/changes/EditarSetor.js';
import CadastroSetor from './pages/inserts/CadastroSetor.js';
import React from 'react';

function App() {
  const dark_mode = localStorage.getItem('dark_mode');

  return (
    <BrowserRouter>
    {/* style={dark_mode == 1 ? { background: "#FFFFFF" } : { background: "#2b2b2b" }} */}
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
