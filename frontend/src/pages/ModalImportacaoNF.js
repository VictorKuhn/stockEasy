import '../styles/ModalImportacaoNF.css';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import xmljs from 'xml-js';
import ModalDiv1 from './ModalDiv1';
import ModalDiv2 from './ModalDiv2';

const ModalImportacaoNF = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const cancelReq = () => {
        props.showModal()

        toast.error('Alterações descartadas.');
    }

    const renderRecords = () => {

        if (!props.convertedJson) {
            return null;
        }

        const records = props.convertedJson.nfeProc.NFe.infNFe.det;
        if (!records) {
            return null;
        }

        return (
            <div className="auxDivs-background">
                <div className="div-table-resultados1">
                    <ModalDiv1 records={records} showDiv2={showDiv2} filterData={filterData} />
                </div>
                <div className="div-table-resultados2">
                    <ModalDiv2 showDiv2={showDiv2} filterData={filterData} />
                </div>
            </div>
        );
    };

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
                                <button type="submit" style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalImportacaoNF