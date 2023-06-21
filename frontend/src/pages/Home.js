import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '../componentes/Header.js'
import SideBar from '../componentes/SideBar.js'
import '../styles/Home.css'
import '../styles/MyResponsiveFunnel.css'
import '../utils/locales'
import { MyResponsiveFunnel } from './MyResponsiveFunnel.js';

const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [qtdTotalEstoque, setQtdTotalEstoque] = useState(0);
  const [qtdTotalSaida, setQtdTotalSaida] = useState(0);
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [valorTotalTransferencias, setValorTotalTransferencias] = useState(0);
  const [loadScreen, setLoadScreen] = useState(0)

  // Chart dos Produtos no Estoque
  const [dataChart, setDataChart] = useState([])
  const [dataChartTemp, setDataChartTemp] = useState([]);
  const [dataChartIdTemp, setDataChartIdTemp] = useState([]);
  const [dataChartMaxValueTemp, setDataChartMaxValueTemp] = useState([]);
  const [changeChartProducts, setChangeChartProducts] = useState(0)

  // Chart dos Produtos Transferidos
  const [dataChart2, setDataChart2] = useState([])
  const [dataChartTemp2, setDataChartTemp2] = useState([]);
  const [dataChartIdTemp2, setDataChartIdTemp2] = useState([]);
  const [dataChartMaxValueTemp2, setDataChartMaxValueTemp2] = useState([]);
  const [changeChartProducts2, setChangeChartProducts2] = useState(0)

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
    setData(response.data);
    const response2 = await axios.get("http://localhost:5000/api/getMovimentacoes");
    setData2(response2.data);
    const response3 = await axios.get("http://localhost:5000/api/getProdutosComEstoqueEMovimentacao");
    setData3(response3.data);
    setLoadScreen(Math.floor(Math.random() * 10))
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleChart()
    handleChart2()
    totalStorageLoader();
  }, [loadScreen])

  const totalStorageLoader = () => {
    let i = 0;
    let temp = 0;
    let cont = 0;
    let cont2 = 0;
    let cont3 = 0;
    let cont4 = 0;

    // QTD TOTAL DE ITENS NO ESTOQUE
    for (i; i < data.length; i++) {
      temp += data[i].qtd_produto_estoque;
    }
    setQtdTotalEstoque(temp)

    // QTD TOTAL DE TRANFERENCIAS
    for (i = 0, temp = 0; i < data2.length; i++) {
      cont = data2[i].movimentacao_produto;
      if (cont === 0) {
        temp += data2[i].qtd_movimentacao_produto
      }
    }

    setQtdTotalSaida(temp)

    // VALOR TOTAL DO ESTOQUE
    for (i = 0, temp = 0; i < data.length; i++) {
      cont = data[i].qtd_produto_estoque;
      cont2 = data[i].valor_produto;
      cont3 = cont * cont2
      cont4 += cont3
    }
    setValorTotalEstoque(cont4)

    // VALOR TOTAL EM TRANSFERENCIAS
    for (i = 0, temp = 0; i < data3.length; i++) {
      if (data3[i].movimentacao_produto === 0) {
        cont = data3[i].qtd_produto_estoque
        cont2 = data3[i].valor_produto
        cont3 = cont * cont2
        cont4 = 0
        cont4 += cont3
      }
    }
    setValorTotalTransferencias(cont4)
  }

  const handleChart2 = () => {
    let i = 0

    // 5 ITENS DE MAIOR TRANFERÊNCIAS
    for (i = 0; i < data2.length; i++) {
      if (data2[i].movimentacao_produto === 0) {
        dataChartTemp2.push(data2[i].qtd_movimentacao_produto);
        dataChartIdTemp2.push(data2[i].nome_produto)
      }
    }

    for (i = 0; i < 5; i++) {
      dataChartMaxValueTemp2.push(Math.max(...dataChartTemp2))

      const index2 = dataChartTemp2.indexOf(Math.max(...dataChartTemp2));
      if (index2 > -1 && dataChart2.length < 5) {
        dataChart2.push({
          "id": dataChartIdTemp2[index2],
          "label": dataChartIdTemp2[index2],
          "value": dataChartTemp2[index2],
        })

        dataChartTemp2.splice(index2, 1);
        dataChartIdTemp2.splice(index2, 1);
      }

      if (i === 4) {
        break;
      }
    }
    console.log(dataChart2)
  }

  const handleChart = () => {
    let i = 0

    // 5 ITENS DE MAIOR QUANTIDADE
    for (i = 0; i < data.length; i++) {
      dataChartTemp.push(data[i].qtd_produto_estoque);
      dataChartIdTemp.push(data[i].nome_produto)
    }

    for (i = 0; i < 5; i++) {
      dataChartMaxValueTemp.push(Math.max(...dataChartTemp))

      const index = dataChartTemp.indexOf(Math.max(...dataChartTemp));
      if (index > -1 && dataChart.length < 5) {
        dataChart.push({
          "id": dataChartIdTemp[index],
          "label": dataChartIdTemp[index],
          "value": dataChartTemp[index],
        })

        dataChartTemp.splice(index, 1);
        dataChartIdTemp.splice(index, 1);
      }

      if (i === 4) {
        break;
      }
    }
  }

  return (
    <div className='background'>
      <Header />
      <SideBar />
      <div className="homeBackgroundContent">
        <div className='backgroundContent'>
          <div className='backgroundTitle'>
            <h1>Visão Geral</h1>
          </div>
          <div className="divBackground">
            <div className="divContent">
              <div className="contents">
                <div className="divTitles">
                  <h1 className='contentsTitle'>Produtos no estoque:</h1>
                  <h1 className='contentsTitle'>Produtos transferidos:</h1>
                </div>
                  <div className="divInsideContents">
                    <div className='insideDivs' onClick={() => changeChartProducts === 0 ? setChangeChartProducts(1) : setChangeChartProducts(0)}>
                      {changeChartProducts === 0 ? <h1 className='firstBox'>{qtdTotalEstoque}</h1> : <MyResponsiveFunnel data={dataChart} />}
                    </div>
                    <div className='insideDivs' onClick={() => changeChartProducts2 === 0 ? setChangeChartProducts2(1) : setChangeChartProducts2(0)}>
                      {changeChartProducts2 === 0 ? <h1 className='forthBox'>{qtdTotalSaida}</h1> : <MyResponsiveFunnel data={dataChart2} />}
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
                    <h1 className='thirdBox changeColor'>{valorTotalEstoque.formatCurrency()}</h1>
                  </div>
                  <div className='insideDivs'>
                    <h1 className='secondBox'>{valorTotalTransferencias.formatCurrency()}</h1>
                    <p className='textInfo'>{"(Nos últimos 30 dias)"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </div>
  )
}

export default Home