import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Produtos.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';
import ModalRelatedProd from './ModalRelatedProd';

const Produtos = () => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const excluirProduto = (id) => {
    if (window.confirm("Você tem certeza que deseja excluir esse produto?")) {
      axios.delete(`http://localhost:5000/api/excluirProduto/${id}`)
        .then((response) => {
          toast.success("Produto excluído com sucesso.");
          loadData();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao excluir o produto.");
        });
    }
  };

  const filterData = (data) => {
    return data.filter(
      (produto) =>
        produto.nome_produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.id_produto.toString().includes(searchTerm)
    );
  };

  const showModal = () => {
    const item = document.querySelector('.modalBackground4')

    if (item.style.display == "flex") {
      item.style.display = "none"
    } else {
      item.style.display = "flex"
    }
  }

  const handleClick = async (aux) => {
    const response = await axios.get(`http://localhost:5000/api/getProdutosFornecedor/${aux}`);
    setData2(response.data);
    console.log(response.data)
    showModal()
  }

  return (
    <div className="Produto">
      <Header />
      <SideBar />
      <ModalRelatedProd showModal={showModal} data={data2} />

      <div className="table-container">
        <div className="campo-procurar">
          <input
            type="text"
            placeholder="Digite o nome do produto que você deseja encontrar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="clear"></div>
        </div>

        <Link to="/cadastrarProduto">
          <button className="btn btn-add-produto">Cadastrar Produto</button>
        </Link>

        <button className="btn btn-add-produto">+ Requisição</button>
        <div className="main-table-div">
          <table className="main-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Código</th>
                <th style={{ textAlign: "center" }}>Descrição</th>
                <th style={{ textAlign: "center" }}>Valor</th>
                <th style={{ textAlign: "center" }}>Qtde. Estoque</th>
                <th style={{ textAlign: "center" }}>Cod. aux</th>
                <th style={{ textAlign: "center" }}>Ações</th>
                <th style={{ textAlign: "center" }}>Itens Relacionados</th>
              </tr>
            </thead>
            <tbody>
              {filterData(data).map((produto, index) => (
                <tr key={produto.id_produto}>
                  <th scope="row">{index + 1}</th>
                  <td>{produto.id_produto}</td>
                  <td>{produto.nome_produto}</td>
                  <td>{produto.valor_produto.formatCurrency()}</td>
                  <td>{produto.qtd_produto_estoque}</td>
                  <td>{produto.cod_aux}</td>
                  <td>
                    <Link to={`/editarProduto/${produto.id_produto}`}>
                      <button className="btn btn-edit">Editar</button>
                    </Link>
                    <button
                      className="btn btn-excluir"
                      onClick={() => excluirProduto(produto.id_produto)}
                    >
                      Excluir
                    </button>
                  </td>
                  <td className='searchCodAux' onClick={() => handleClick(produto.cod_aux)}><i class="fa-solid fa-magnifying-glass"></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Produtos;