import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../styles/CadastroProduto.css';

const CadastroProduto = () => {
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        nome_produto: '',
        valor_produto: '',
        qtd_produto_estoque: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/cadastrarProduto', produto);
            toast.success('Produto cadastrado com sucesso.');
            navigate('/produtos');
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o produto.');
        }
    };

    return (
        <div>
            <Header />
            <SideBar />

            <div class="formulario-cadastrar">
                <h2>Cadastro de Produto</h2>
                <form className="form-cadastro" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nome_produto">Nome do Produto:</label>
                        <input
                            type="text"
                            id="nome_produto"
                            name="nome_produto"
                            value={produto.nome_produto}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="valor_produto">Valor do Produto:</label>
                        <input
                            type="number"
                            id="valor_produto"
                            name="valor_produto"
                            value={produto.valor_produto}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="qtd_produto_estoque">Quantidade em Estoque:</label>
                        <input
                            type="number"
                            id="qtd_produto_estoque"
                            name="qtd_produto_estoque"
                            value={produto.qtd_produto_estoque}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
};

export default CadastroProduto;
