import '../styles/ModalRelatedProd.css';
import React, { useState, useEffect, useRef } from 'react';

const ModalRelatedProd = (props) => {

    const [searchTerm, setSearchTerm] = useState("")

    const filterData = (data) => {
        return data.filter(
            (item) =>
                item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.registro.toString().includes(searchTerm)
        );
    };

    return (
        <>
            <div className="modalBackground4">
                <div className="modalStructure4">
                    <div className="modalTitle4">
                        <h1>Itens associados:</h1>
                    </div>
                    <div className="campo-procurarNF4">
                        <input
                            type="text"
                            placeholder="Digite o nome do produto que você deseja encontrar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            id="inputSearchCodAux"
                        />
                        <div className="clearNF"></div>
                    </div>
                    <div className="modalContent4">
                        <div className="table-background4">
                            <table className="main-table4">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>No.</th>
                                        <th style={{ textAlign: "center" }}>Código</th>
                                        <th style={{ textAlign: "center" }}>Registro</th>
                                        <th style={{ textAlign: "center" }}>Descricao</th>
                                        <th style={{ textAlign: "center" }}>Qtde</th>
                                        <th style={{ textAlign: "center" }}>Valor</th>
                                        <th style={{ textAlign: "center" }}>Cod. Aux</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterData(props.data).map((item, index) => (
                                        <tr key={item.id_item}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.id_item}</td>
                                            <td>{item.registro}</td>
                                            <td>{item.descricao}</td>
                                            <td>{item.qtde}</td>
                                            <td>{item.valor}</td>
                                            <td>{item.aux}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modalBottom4">
                            <div>
                                <button type="reset" style={{ backgroundColor: "#ff0000" }} onClick={props.showModal}><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRelatedProd