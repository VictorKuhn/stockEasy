import '../styles/ModalImportacaoNF.css';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import ModalDiv1 from './ModalDiv1';
import ModalDiv2 from './ModalDiv2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalImportacaoNF = (props) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [itensCodAux, setItensCodAux] = useState([])
    const [codAux, setCodAux] = useState([])
    const [idAux, setIdAux] = useState([])
    const [qtdAux, setQtdAux] = useState([])
    const [finalItem, setFinalItem] = useState([])
    const navigate = useNavigate();
    const [cont1, setCont1] = useState(0)
    const [cont2, setCont2] = useState(0)
    const [cont3, setCont3] = useState(0)

    const cancelReq = () => {
        setCont1(0)
        setCont2(0)
        setCodAux([])
        setItensCodAux([])
        setFinalItem([])
        showDiv2()
        props.resetFileInput()
        props.reset()
        props.showModal()
        toast.error('Alterações descartadas.');
    }

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    const renderRecords = () => {

        if (!props.convertedJson) {
            return null;
        }

        if (!props.records) {
            return null;
        }

        return (
            <div className="auxDivs-background">
                <div className="div-table-resultados1">
                    <ModalDiv1 records={props.records} cont1={cont1} setCont1={setCont1} setCont3={setCont3} showDiv2={showDiv2} filterData={filterData} itensCodAux={itensCodAux} qtdAux={qtdAux} setQtdAux={setQtdAux} />
                </div>
                <div className="div-table-resultados2">
                    <ModalDiv2 showDiv2={showDiv2} cont2={cont2} setCont2={setCont2} filterData={filterData} codAux={codAux} idAux={idAux} setIdAux={setIdAux} />
                </div>
            </div>
        );
    };

    const processData = async (e) => {
        e.preventDefault();
        try {
            if (cont1 === 0) {
                toast.error('Nenhum item selecinado.');
            } else {
                if (cont1 === cont2) {
                    if (cont3 === 0) {
                        for (let i = 0; i < codAux.length; i++) {
                            finalItem.push({
                                registro: itensCodAux[i].registro,
                                descricao: itensCodAux[i].descricao,
                                qtde: itensCodAux[i].qtde,
                                valor: itensCodAux[i].valor,
                                aux: codAux[i].aux
                            })
                            handleClick(i)
                        }

                        for (let i = 0; i < idAux.length; i++) {
                            handleClick2(idAux, qtdAux, i)
                        }

                        toast.success('Códigos associados com sucesso.');
                        setCont1(0)
                        setCont2(0)
                        setCodAux([])
                        setItensCodAux([])
                        setFinalItem([])
                        navigate('/produtos');
                    } else {
                        toast.error('Os códigos auxiliares não foram associados.')
                    }
                } else {
                    toast.error('Código auxiliar não foi associado corretamente.');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Erro ao adicionar os códigos.');
        }
    }

    const handleClick = async (i) => {
        await axios.post('http://localhost:5000/api/cadastrarProdutoFornecedor', finalItem[i])
        // console.log(finalItem[i])
    };

    const handleClick2 = async (idAux, qtdAux, i) => {
        var [itemAux] = [
            {
                id_produto: 0,
                qtd_produto: 0
            }
        ]
        itemAux.id_produto = idAux[i]
        itemAux.qtd_produto = qtdAux[i]

        // console.log(itemAux)
        await axios.put("http://localhost:5000/api/inserirEstoque", itemAux)
        handleClick3(itemAux)
    };

    const handleClick3 = async (itemAux) => {
        var [itemMovi] = [
            {
                id_produto_movimentacao: itemAux.id_produto,
                movimentacao_produto: 1,
                data_movimentacao_produto: today.toISOString(),
                qtd_movimentacao_produto: itemAux.qtd_produto,
            }
        ];
        // console.log(itemMovi)
        await axios.post("http://localhost:5000/api/cadastrarMovimentacao", itemMovi)
    }

    const showDiv2 = () => {
        const item1 = document.querySelector('.div-table-resultados1')
        const item2 = document.querySelector('.div-table-resultados2')
        const searchInput = document.querySelector('#inputSearchCodAux')

        if (item2.style.display == "flex") {
            item2.style.display = "none"
            searchInput.disabled = false
            searchInput.placeholder = "Digite o nome do produto que você deseja encontrar..."
        } else {
            item2.style.display = "flex"
            searchInput.disabled = true
            searchInput.placeholder = "Pesquisa desabilitada"
        }

        if (item1.style.display == "none") {
            item1.style.display = "flex"
            searchInput.disabled = true
            searchInput.placeholder = "Pesquisa desabilitada"
        } else {
            item1.style.display = "none"
            searchInput.disabled = false
            searchInput.placeholder = "Digite o nome do produto que você deseja encontrar..."
        }
    }

    const filterData = (data) => {
        return data.filter(
            (produto) =>
                produto.nome_produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                produto.id_produto.toString().includes(searchTerm)
        );
    };

    return (
        <>
            <div className="modalBackground3">
                <div className="modalStructure3">
                    <div className="modalTitle3">
                        <h1>Insira os códigos auxiliares:</h1>
                    </div>
                    <div className="campo-procurarNF">
                        <input
                            type="text"
                            placeholder="Pesquisa desabilitada"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            id="inputSearchCodAux"
                            disabled
                        />
                        <div className="clearNF"></div>
                    </div>
                    <div className="modalContent3">
                        <div className="table-background3">
                            {renderRecords()}
                        </div>
                        <div className="modalBottom3">
                            <div>
                                <button type="reset" style={{ backgroundColor: "#ff0000" }} onClick={cancelReq}><i class="fa-solid fa-trash"></i></button>
                                <button type="submit" style={{ backgroundColor: "#4CAF50" }} onClick={processData}><i class="fa-solid fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalImportacaoNF