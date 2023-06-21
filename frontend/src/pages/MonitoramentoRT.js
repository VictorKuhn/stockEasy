import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/MonitoramentoRT.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import moment from 'moment'
import ModalRequisicoes from './ModalRequisicoes';
import ModalDescAdmin from './ModalDescAdmin';
import { Button, Modal } from 'react-bootstrap';

const MonitoramentoRT = () => {
    const [nivelAcesso, setNivelAcesso] = useState(0);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [item, setItem] = useState({
        desc_status: "",
        id_requisicao: 0,
        nome_produto: "",
        nome_usuario: "",
        qtd_produto: 0,
        desc_func: ""
    });

    const [item2, setItem2] = useState({
        id_produto_movimentacao: 0,
        movimentacao_produto: 0,
        data_movimentacao_produto: "",
        qtd_movimentacao_produto: 0,
    });

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    const loadData = async () => {
        const response1 = await axios.get("http://localhost:5000/api/getRequisicoesPendente");
        setData1(response1.data);
        const response2 = await axios.get("http://localhost:5000/api/getMovimentacoes");
        setData2(response2.data);
        const response3 = await axios.get("http://localhost:5000/api/getProdutosComEstoque");
        setData3(response3.data);
        AlterarCorLinha();
    };

    useEffect(() => {
        loadData();
        AlterarCorLinha()
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

    function showModal2() {
        const item = document.querySelector('.modalBackground2')

        if (item.style.display == "flex") {
            item.style.display = "none"
            setItem({
                desc_status: "",
                id_requisicao: 0,
                nome_produto: "",
                nome_usuario: "",
                qtd_produto: 0,
                desc_func: ""
            })
        } else {
            item.style.display = "flex"
        }
    }

    const handleClickDenied = async () => {
        if (item.id_requisicao === 0) {
            toast.error('Nenhum item selecionado!')
        } else {
            handleSubmitDeny()
        }
    }

    const handleSubmitDeny = async () => {
        try {
            showModal2()
        } catch (error) {
            console.log(error);
            toast.error('Erro ao alterar a requisição para recusada.')
        }
        loadData()
    }

    const handleClickAccept = async () => {
        if (item.id_requisicao === 0) {
            toast.error('Nenhum item selecionado!')
        } else {
            handleSubmitAccept()
        }
    }

    const handleSubmitAccept = async () => {
        try {
            handleClick(item2.id_produto_movimentacao, item2.qtd_movimentacao_produto)
            await axios.post("http://localhost:5000/api/cadastrarMovimentacao", item2)
            await axios.put(`http://localhost:5000/api/updateRequisicoesParaAprovadas/${item.id_requisicao}`)
            toast.success(`Requisição ${item.id_requisicao} aprovada com sucesso.`)
            setItem({
                desc_status: "",
                id_requisicao: 0,
                nome_produto: "",
                nome_usuario: "",
                qtd_produto: 0,
                desc_func: ""
            })
            setItem2({
                id_produto_movimentacao: 0,
                movimentacao_produto: 0,
                data_movimentacao_produto: "",
                qtd_movimentacao_produto: 0,
            })
        } catch (error) {
            console.log(error);
            toast.error('Erro ao alterar a requisição para aprovada.')
        }
        loadData()
    }

    const handleClick = async (idAux, qtdAux) => {
        var [itemAux] = [
            {
                id_produto: 0,
                qtd_produto: 0
            }
        ]
        itemAux.id_produto = idAux
        itemAux.qtd_produto = qtdAux

        await axios.put("http://localhost:5000/api/removerEstoque", itemAux)
    };

    const changeItem2 = (item) => {
        for (let i = 0; i < data3.length; i++) {
            if (item.nome_produto === data3[i].nome_produto) {
                setItem2({
                    id_produto_movimentacao: data3[i].id_produto,
                    movimentacao_produto: 0,
                    data_movimentacao_produto: today.toISOString(),
                    qtd_movimentacao_produto: item.qtd_produto,
                })
            }
        }
    }

    const changeItem = (item) => {
        setItem(item)
        changeItem2(item)
    }

    useEffect(() => {
        const nivelAcessoUsuario = localStorage.getItem('nivel_acesso_usuario');
        setNivelAcesso(Number(nivelAcessoUsuario));
    }, []);

    return (
        <div className="Home">
            <Header />
            <SideBar />
            <ModalRequisicoes showModal={showModal} loadData={loadData} />
            <ModalDescAdmin showModal2={showModal2} loadData={loadData} item={item} />
            {/* Sidebar = 70px */}
            <div className="background-div">
                <div className='div-h1-button'>
                    <h1>Requisições de Transferência</h1>
                    <button className="req-add-button" style={{ backgroundColor: "#f7cf1d" }} type='submit' onClick={showModal}><i class="fa-solid fa-plus"></i></button>
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
                                <th style={{ textAlign: "center" }}>Desc. Func:</th>
                            </tr>
                        </thead>
                        <tbody className="table-even">
                            {data1.map((movi1, index) => (
                                <tr key={movi1.id_requisicao} onClick={() => changeItem(movi1)} className="selectedListItem">
                                    <th scope="row">{index + 1}</th>
                                    <td>{movi1.id_requisicao}</td>
                                    <td>{movi1.nome_usuario}</td>
                                    <td>{movi1.nome_produto}</td>
                                    <td>{movi1.qtd_produto}</td>
                                    <td>{movi1.desc_status}</td>
                                    <td>{movi1.desc_func}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='div-h1-button'>
                    <h1>Últimas Tranferências</h1>
                    {nivelAcesso === 1 && (
                        <div>
                            <button style={{ backgroundColor: "#ff0000" }} onClick={handleClickDenied}><i class="fa-solid fa-xmark"></i></button>
                            <button style={{ backgroundColor: "#4CAF50" }} onClick={handleClickAccept}><i class="fa-solid fa-check"></i></button>
                        </div>
                    )}
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
