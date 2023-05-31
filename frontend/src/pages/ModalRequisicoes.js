import '../styles/ModalRequisicoes.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/EditarProduto.css';

const ModalRequisicoes = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        id_produto: 0,
        nome_produto: '',
        qtd_produto_estoque: 0
    });

    const getProduto = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getProdutoEstoque/${id}`);
            const { id_produto, nome_produto, qtd_produto_estoque } = response.data;
            setProduto({ id_produto, nome_produto, qtd_produto_estoque });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));
        getProduto(produto.id_produto)
    };

    return (
        <>
            <div className="modalBackground">
                <div className="modalStructure">
                    <div className="modalTitle">
                        <h1>Inserção de Requisições</h1>
                    </div>
                    <div className="modalContent">
                        <form action="" className="modalForm">
                            <div>
                                <label htmlFor="nome_usuario">Usuário:</label>
                                <input disabled />
                            </div>
                            <div>
                                <label htmlFor="id_produto">Código do Produto:</label>
                                <input
                                    type="text"
                                    id="id_produto"
                                    name="id_produto"
                                    value={produto.id_produto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="nome_produto">Nome do Produto:</label>
                                <input
                                    type="text"
                                    id="nome_produto"
                                    name="nome_produto"
                                    value={produto.nome_produto}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="qtd_req">Quantidade Requisitada:</label>
                                <input

                                />
                            </div>
                            <div>
                                <label htmlFor="qtd_estoque">Quantidade no Estoque:</label>
                                <input
                                    type="text"
                                    id="qtd_produto_estoque"
                                    name="qtd_produto_estoque"
                                    value={produto.qtd_produto_estoque}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modalBottom">
                        <div>
                            <button type="submit" style={{ backgroundColor: "#ff0000" }}><i class="fa-solid fa-trash"></i></button>
                            <button type="submit" style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRequisicoes