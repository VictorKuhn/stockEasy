import '../styles/ModalRequisicoes.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/EditarProduto.css';

const ModalRequisicoes = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        id_produto: 0,
        nome_produto: 'Nenhum item definido',
        qtd_produto_estoque: 0,
    });

    const [requisicao, setRequisicao] = useState({
        id_usuario_requisicao: localStorage.getItem('id_usuario'),
        id_produto_requisicao: 0,
        qtd_produto: 0,
        status_produto: 0,
        desc_func: ""
    });

    const getProduto = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getProdutoEstoque/${id}`);
            const { id_produto, nome_produto, qtd_produto_estoque } = response.data;
            setProduto({ id_produto, nome_produto, qtd_produto_estoque });
            setRequisicao({
                id_usuario_requisicao: localStorage.getItem('id_usuario'),
                id_produto_requisicao: id_produto,
                qtd_produto: 0,
                status_produto: 1,
                desc_func: ""
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/cadastrarRequisicao', requisicao);
            props.showModal()
            navigate('/monitoramentoRT');
            props.loadData() // -> recarrega a tabela sem recarregar a tela
            toast.success("Requisição cadastrada com sucesso.");
            setProduto({
                id_produto: 0,
                nome_produto: "",
                qtd_produto_estoque: 0
            });

            setRequisicao({
                id_usuario_requisicao: localStorage.getItem('id_usuario'),
                id_produto_requisicao: 0,
                qtd_produto: 0,
                status_produto: 0,
                desc_func: ""
            })
            // window.location.reload(true)
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar a requisição.');
        }
    };

    const cancelReq = () => {
        props.showModal()

        setProduto({
            id_produto: 0,
            nome_produto: "",
            qtd_produto_estoque: 0
        });

        setRequisicao({
            id_usuario_requisicao: localStorage.getItem('id_usuario'),
            id_produto_requisicao: 0,
            qtd_produto: 0,
            status_produto: 0,
            desc_func: ""
        })

        toast.error('Requisição cancelada.');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));

        getProduto(value)
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setRequisicao((prevRequisicao) => ({
            ...prevRequisicao,
            [name]: value,
        }));
    }

    useEffect(() => {
        // Recupera o nome do usuário do localStorage
        const nomeUsuario = localStorage.getItem('nome_usuario');
        const idUsuario = localStorage.getItem('id_usuario');
        // Define o valor do nome do usuário no estado
        setRequisicao((prevRequisicao) => ({
            ...prevRequisicao,
            id_usuario: idUsuario,
            nome_usuario: nomeUsuario,
        }));
    }, []);

    return (
        <>
            <div className="modalBackground">
                <div className="modalStructure">
                    <div className="modalTitle">
                        <h1>Inserção de Requisições</h1>
                    </div>
                    <div className="modalContent">
                        <form action="" className="modalForm" onSubmit={handleSubmit}>
                            <div className="divModalContent">
                                <label htmlFor="nome_usuario">Usuário:</label>
                                <input
                                    disabled
                                    placeholder='Usuário'
                                    id="input-usuario-sessao"
                                    value={localStorage.getItem('nome_usuario')}
                                />
                            </div>
                            <div className="divModalContent">
                                <label htmlFor="id_produto">Código do Produto:</label>
                                <input
                                    type="text"
                                    id="id_produto"
                                    name="id_produto"
                                    value={produto.id_produto}
                                    onChange={handleChange}
                                    required
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent">
                                <label htmlFor="nome_produto">Nome do Produto:</label>
                                <input
                                    type="text"
                                    id="nome_produto"
                                    name="nome_produto"
                                    value={produto.nome_produto}
                                    disabled
                                    placeholder='Nome do Produto'
                                />
                            </div>
                            <div className="divModalContent">
                                <label htmlFor="qtd_produto">Quantidade Requisitada:</label>
                                <input
                                    type="text"
                                    id="qtd_produto"
                                    name="qtd_produto"
                                    value={requisicao.qtd_produto}
                                    onChange={handleChange2}
                                    required
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent">
                                <label htmlFor="qtd_estoque">Quantidade no Estoque:</label>
                                <input
                                    type="text"
                                    id="qtd_produto_estoque"
                                    name="qtd_produto_estoque"
                                    value={produto.qtd_produto_estoque}
                                    disabled
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent">
                                <label htmlFor="qtd_estoque">Descrição:</label>
                                <input
                                    type="text"
                                    id="desc_func"
                                    name="desc_func"
                                    value={requisicao.desc_func}
                                    onChange={handleChange2}
                                    placeholder='Breve descrição'
                                />
                            </div>
                            <div className="modalBottom">
                                <div>
                                    <button type="reset" style={{ backgroundColor: "#ff0000" }} onClick={cancelReq}><i class="fa-solid fa-trash"></i></button>
                                    <button type="submit" style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRequisicoes