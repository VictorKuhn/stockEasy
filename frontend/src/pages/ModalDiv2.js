import '../styles/ModalDiv.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalDiv2 = (props) => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getProdutosCodAux");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const processData = (aux) => {
        props.codAux.push({
            aux: aux
        })
        props.setCont2(props.cont2+1)
        props.showDiv2()
    }

    return (
        <div className="tables-divsOverflow">
            <table className="table-resultados">
                <thead>
                    <tr>
                        <th>Registro</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Aux</th>
                    </tr>
                </thead>
                <tbody>
                    {props.filterData(data).map((item, index) => (
                        <tr key={index} className="selectedAux" onClick={() => processData(item.cod_aux)}>
                            <td>{item.id_produto}</td>
                            <td>{item.nome_produto}</td>
                            <td>{item.valor_produto}</td>
                            <td>{item.cod_aux}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ModalDiv2