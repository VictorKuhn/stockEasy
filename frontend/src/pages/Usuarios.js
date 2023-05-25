import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Produtos.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';

const Usuarios = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getUsuariosComNivel");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const excluirUsuario = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir esse usuário?")) {
      axios.delete(`http://localhost:5000/api/excluirUsuario/${id}`)
        .then((response) => {
          toast.success("Usuário excluído com sucesso.");
          loadData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao excluir o usuário.");
        });
    }
  };

  return (
    <div className="Produto">
      <Header />
      <SideBar />

      <div className="table-container">
        <Link to="/cadastrarUsuario">
          <button className="btn btn-add-produto">Cadastrar Usuário</button>
        </Link>
        <table className="main-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Login</th>
              <th style={{ textAlign: "center" }}>Nome</th>
              <th style={{ textAlign: "center" }}>Nível de Acesso</th>
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((usuario, index) => (
              <tr key={usuario.id_usuario}>
                <th scope="row">{index + 1}</th>
                <td>{usuario.login_usuario}</td>
                <td>{usuario.nome_usuario}</td>
                <td>{usuario.nome_acesso}</td>
                <td>
                  <Link to={`/editarUsuario/${usuario.id_usuario}`}>
                    <button className="btn btn-edit">Editar</button>
                  </Link>
                  <button
                    className="btn btn-excluir"
                    onClick={() => excluirUsuario(usuario.id_usuario)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
