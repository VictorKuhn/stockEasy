import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../styles/EditarProduto.css';

const EditarProduto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        nome_produto: '',
        valor_produto: 0,
    });

    useEffect(() => {
        const getProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getProduto/${id}`);
                const { nome_produto, valor_produto } = response.data;
                setProduto({ nome_produto, valor_produto });
            } catch (error) {
                console.log(error);
            }
        };
        getProduto();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/editarProduto/${id}`, produto);
            toast.success("Produto atualizado com sucesso.");
            navigate('/produtos');
        } catch (error) {
            console.log(error);
            toast.error("Erro ao atualizar o produto.");
        }
    };

    return (
        <div>
            <Header />
            <SideBar />
            <div className="formulario-editar">
                <h2>Edição de Produto</h2>
                <form className="form-edit" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nome_produto">Descrição:</label>
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
                        <label htmlFor="valor_produto">Valor:</label>
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
                    <button type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarProduto;
