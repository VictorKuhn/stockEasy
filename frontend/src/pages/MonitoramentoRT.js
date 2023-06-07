import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/MonitoramentoRT.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import moment from 'moment'
import ModalRequisicoes from './ModalRequisicoes';
import { Button, Modal } from 'react-bootstrap';

const MonitoramentoRT = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const loadData = async () => {
        const response1 = await axios.get("http://localhost:5000/api/getRequisicoesPendente");
        setData1(response1.data);
        const response2 = await axios.get("http://localhost:5000/api/getMovimentacoes");
        setData2(response2.data);
        AlterarCorLinha();
    };

    useEffect(() => {
        loadData();
    }, []);

    function AlterarCorLinha() {
        const items = document.querySelectorAll('#corpoTabelaProdutos > tr')
        items.forEach(element => {

            const estadoMovimentacao = element.children[5].textContent;

            if (estadoMovimentacao === "Entrada") {
                element.classList.remove('linhaAlterar');
                element.classList.add('linhaColunasProdutosVerde');
            } else if (estadoMovimentacao === "Saída") {
                element.classList.remove('linhaAlterar');
                element.classList.add('linhaColunasProdutosVermelho');
            } else {
                console.log("Erro na movimentação")
            }
        });
    }

    function formatarData(data) {
        return moment(data).format("DD/MM/YYYY hh:mm:ss")
    }

    function showModal() {
        const item = document.querySelector('.modalBackground')

        if (item.style.display == "flex") {
            item.style.display = "none"
        } else {
            item.style.display = "flex"
        }
    }

    return (
        <div className="Home">
            <Header />
            <SideBar />
            <ModalRequisicoes showModal={showModal} loadData={loadData}/>
            {/* Sidebar = 70px */}
            <div className="background-div">
                <div className='div-h1-button'>
                    <h1>Requisições de Transferência</h1>
                    <button style={{ backgroundColor: "#f7cf1d" }} type='submit' onClick={showModal}><i class="fa-solid fa-plus"></i></button>
                </div>
                <div className='div-tables'>
                    <table className="tables">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>No.</th>
                                <th style={{ textAlign: "center" }}>Código</th>
                                <th style={{ textAlign: "center" }}>Usuário:</th>
                                <th style={{ textAlign: "center" }}>Produto:</th>
                                <th style={{ textAlign: "center" }}>Qtde. Requisitada:</th>
                                <th style={{ textAlign: "center" }}>Status:</th>
                            </tr>
                        </thead>
                        <tbody className="table-even">
                            {data1.map((movi1, index) => (
                                <tr key={movi1.id_requisicao}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{movi1.id_requisicao}</td>
                                    <td>{movi1.nome_usuario}</td>
                                    <td>{movi1.nome_produto}</td>
                                    <td>{movi1.qtd_pruduto}</td>
                                    <td>{movi1.desc_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='div-h1-button'>
                    <h1>Últimas Tranferências</h1>
                    <div>
                        <button style={{ backgroundColor: "#ff0000" }}><i class="fa-solid fa-xmark"></i></button>
                        <button style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                    </div>
                </div>
                <div className='div-tables'>
                    <table className="tables">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>No.</th>
                                <th style={{ textAlign: "center" }}>Código</th>
                                <th style={{ textAlign: "center" }}>Produto:</th>
                                <th style={{ textAlign: "center" }}>Qtde. Movimentada:</th>
                                <th style={{ textAlign: "center" }}>Data:</th>
                                <th style={{ textAlign: "center" }}>Movimento:</th>
                            </tr>
                        </thead>
                        <tbody id="corpoTabelaProdutos">
                            {data2.map((movi2, index) => (
                                <tr key={movi2.id_movimentacao} id="linhaAlterar">
                                    <th scope="row">{index + 1}</th>
                                    <td>{movi2.id_movimentacao}</td>
                                    <td>{movi2.nome_produto}</td>
                                    <td>{movi2.qtd_movimentacao_produto}</td>
                                    <td>{formatarData(movi2.data_movimentacao_produto)}</td>
                                    <td>{movi2.movimento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonitoramentoRT;
