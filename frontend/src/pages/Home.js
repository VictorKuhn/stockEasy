import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../componentes/Header.js'
import SideBar from '../componentes/SideBar.js'
import '../styles/Home.css'

const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [qtdTotalEstoque, setQtdTotalEstoque] = useState(0);
  const [qtdTotalSaida, setQtdTotalSaida] = useState(0);
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
    setData(response.data);
    const response2 = await axios.get("http://localhost:5000/api/getMovimentacoes");
    setData2(response2.data);
  };

  const totalStorageCounter = useCallback((data, data2) => {
    let i = 0;
    let venda = 0;
    let cont = 0;
    let cont2 = 0;
    let cont3 = 0;
    let cont4 = 0;

    for (i; i < data.length; i++) {
      venda += data[i].qtd_produto_estoque;

    }
    setQtdTotalEstoque(venda)

    for (i = 0, venda = 0; i < data2.length; i++) {
      cont = data2[i].movimentacao_produto;
      if (cont === 0) {
        venda += data2[i].qtd_movimentacao_produto
      }
    }
    setQtdTotalSaida(venda)

    for (i = 0, venda = 0; i < data.length; i++) {
      cont = data[i].qtd_produto_estoque;
      cont2 = data[i].valor_produto;
      cont3 = cont * cont2
      cont4 += cont3
    }

    if (cont4 > 0) {
      AlterarCorLinha("green")
    }

    setValorTotalEstoque(cont4)

  }, [])

  useEffect(() => {
    loadData();
    totalStorageCounter(data, data2);
  }, []);

  function AlterarCorLinha(color) {
    const item = document.querySelector('.changeColor')

    if (color === "green") {
      item.classList.add('changeColorGreen');
    }
    if (color === "red") {
      item.classList.add('changeColorRed');
    }
  }

  return (
    <div className='background'>
      <Header />
      <SideBar />
      <div className='backgroundContent'>
        <div className='backgroundTitle'>
          <h1>Visão Geral:</h1>
        </div>
        <div className="divBackground">
          <div className="divContent">
            <div className="contents">
              <div className="divTitles">
                <h1 className='contentsTitle'>Itens no estoque:</h1>
                <h1 className='contentsTitle'>Transfêrencias:</h1>
              </div>
              <div className="divInsideContents">
                <div className='insideDivs'>
                  <h1 className='firstBox'>{qtdTotalEstoque}</h1>
                </div>
                <div className='insideDivs'>
                  <h1 className='forthBox'>{qtdTotalSaida}</h1>
                  <p className='textInfo'>{"(Nos últimos 30 dias)"}</p>
                </div>
              </div>
            </div>
            <div className="contents">
              <div className="divTitles">
                <h1 className='contentsTitle'>Valor patrimonial:</h1>
                <h1 className='contentsTitle'>Valor em transfêrencias:</h1>
              </div>
              <div className="divInsideContents">
                <div className='insideDivs'>
                  <h1 className='thirdBox changeColor'>R${valorTotalEstoque}</h1>
                </div>
                <div className='insideDivs'>
                  <h1 className='secondBox'>R$1.200.000,00</h1>
                  <p className='textInfo'>{"(Nos últimos 30 dias)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  )
}

export default Home