import '../styles/RequisicoesRecusadas.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../utils/locales';

const RequisicoesRecusadas = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getRequisicoesRecusadas");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Header />
            <SideBar />
            <div className="tableContainer">
                <div className="divTitle">
                    <h1 className="title">Requisições Reprovadas:</h1>
                </div>
                <div className="tableOverflow">
                    <table className="mainTable" id="teste">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>No.</th>
                                <th style={{ textAlign: "center" }}>Código</th>
                                <th style={{ textAlign: "center" }}>Usuário:</th>
                                <th style={{ textAlign: "center" }}>Produto:</th>
                                <th style={{ textAlign: "center" }}>Qtd. Requisicao:</th>
                                <th style={{ textAlign: "center" }}>Status:</th>
                                <th style={{ textAlign: "center" }}>Desc. Admin:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((requisicao, index) => (
                                <tr key={requisicao.id_requisicao}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{requisicao.id_requisicao}</td>
                                    <td>{requisicao.nome_usuario}</td>
                                    <td>{requisicao.nome_produto}</td>
                                    <td>{requisicao.qtd_produto}</td>
                                    <td>{requisicao.desc_status}</td>
                                    <td>{requisicao.desc_admin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RequisicoesRecusadas