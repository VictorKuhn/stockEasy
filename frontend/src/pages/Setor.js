import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';

const Setor = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getSetores");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const excluirSetor = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir esse setor?")) {
      axios.delete(`http://localhost:5000/api/excluirSetor/${id}`)
        .then((response) => {
          toast.success("Setor excluído com sucesso.");
          loadData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Setor com funcionários vinculados.");
        });
    }
  };

  const filterData = (data) => {
    return data.filter(
      (setor) =>
        setor.nome_setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        setor.id_setor.toString().includes(searchTerm)
    );
  };

  return (
    <div className="Produto">
      <Header />
      <SideBar />

      <div className="table-container-usuarios">
        <div className="campo-procurar">
          <input
            type="text"
            placeholder="Digite o nome do setor que deseja encontrar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="clear"></div>
        </div>

        <Link to="/cadastrarSetor">
          <button className="btn btn-add-produto">Cadastrar Setor</button>
        </Link>
        <div className="main-table-div">
          <table className="main-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Código</th>
                <th style={{ textAlign: "center" }}>Setor</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterData(data).map((setor, index) => (
                <tr key={setor.id_setor}>
                  <th scope="row">{index + 1}</th>
                  <td>{setor.id_setor}</td>
                  <td>{setor.nome_setor}</td>
                  <td>
                    <Link to={`/editarSetor/${setor.id_setor}`}>
                      <button className="btn btn-edit">Editar</button>
                    </Link>
                    <button
                      className="btn btn-excluir"
                      onClick={() => excluirSetor(setor.id_setor)}
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
    </div>
  );
};

export default Setor;