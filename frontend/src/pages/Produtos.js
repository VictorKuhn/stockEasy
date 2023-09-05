import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Produtos.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';
import ModalRelatedProd from './modals/ModalRelatedProd';
import ModalRequisicoesProdutos from './modals/ModalRequisicoesProdutos';

const Produtos = () => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [itemProd, setItemProd] = useState({
    id_produto: 0,
    nome_produto: '',
    qtd_produto_estoque: 0,
  })

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
    setData(response.data);
  };

  const loadData2 = async (codAux) => {
    await axios.get(`http://localhost:5000/api/getProdutosFornecedor/${codAux}`).then((response) => {
      setData2(response.data);
    });

  };

  useEffect(() => {
    loadData()
    console.log(data)
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

  function showModal2() {
    const item = document.querySelector('.modalBackground')

    if (item.style.display == "flex") {
      item.style.display = "none"
    } else {
      item.style.display = "flex"
    }
  }

  const handleClick = (codAux) => {
    loadData2(codAux)
    showModal()
  }

  const changeReqButton = () => {
    const item = document.getElementById("movedButton")
    const item2 = document.getElementById("disabledButton")

    if (itemProd.id_produto === 0) {
      item2.setAttribute("disabled", "disabled");

      if (item2.disabled === true) {
        item.style.backgroundColor = "#ff5346"
        item2.removeAttribute("disabled");
        item2.style.cursor = "pointer"
        item2.style.opacity = "1";
        item.style.width = "15%"

        setTimeout(() => {
          item2.style.width = "25%"
        }, 400)
      } else {
        item.style.backgroundColor = "#ee7b10"
        item2.setAttribute("disabled", "disabled");
        item2.style.cursor = "default"
        item2.style.opacity = "0";
        item.style.width = "25%"
        item2.style.width = "11%"
      }
    }
  }

  const handleProduto = (id, nome, qtd) => {
    changeReqButton()

    console.log(id)
    setItemProd({
      id_produto: id,
      nome_produto: nome,
      qtd_produto_estoque: qtd,
    })
  }

  return (
    <div className="Produto">
      <Header />
      <SideBar />
      <ModalRelatedProd showModal={showModal} data={data2} />
      <ModalRequisicoesProdutos showModal={showModal2} itemProd={itemProd} setItemProd={setItemProd}/>

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

        <Link to="/cadastrarProduto" id="link-movedButton">
          <button className="btn btn-add-produto" id="movedButton">Cadastrar Produto</button>
        </Link>

        <button id="disabledButton" className="btn btn-add-produto" onClick={showModal2}>+ Requisição: {itemProd.id_produto}</button>
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
                <tr id="handleClick" key={produto.id_produto} onClick={() => handleProduto(produto.id_produto, produto.nome_produto, produto.qtd_produto_estoque)}>
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