import React, { useEffect, useState } from 'react';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../styles/ImportacaoNF.css';
import xmljs from 'xml-js';
import { toast } from 'react-toastify';
import ModalImportacaoNF from './ModalImportacaoNF';

const ptBrCurrencyFormat = {
    style: 'currency',
    currency: 'BRL',
};

Number.prototype.formatCurrency = function () {
    return this.toLocaleString('pt-BR', ptBrCurrencyFormat);
};

export default function ImportacaoNF() {
    const [xmlFile, setXmlFile] = useState(null);
    const [convertedJson, setConvertedJson] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setXmlFile(file);
        setConvertedJson(null);

        if (file) {
            if (file.name.endsWith('.xml')) {
                const reader = new FileReader();
                reader.onload = handleFileRead;
                reader.readAsText(file);
            } else {
                toast.error('Extensão de arquivo inválida. Por favor, selecione um arquivo XML.');
            }
        }
    };

    const handleFileRead = (event) => {
        try {
            const content = event.target.result;
            const json = convertXmlToJson(content);
            setConvertedJson(json);
        } catch (error) {
            toast.error('Ocorreu um erro ao processar o arquivo XML.');
        }
    };

    const convertXmlToJson = (xml) => {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const result = xmljs.xml2json(xml, options);
        return JSON.parse(result);
    };

    const formatValue = (value, format) => {
        if (format === 'currency') {
            return parseFloat(value).formatCurrency();
        } else if (format === 'decimal') {
            return parseFloat(value).toFixed(2);
        } else if (format === 'integer') {
            return parseInt(value, 10);
        }
        return value;
    };

    const showModal = () => {
        const item = document.querySelector('.modalBackground3')

        if (item.style.display == "flex") {
            item.style.display = "none"
        } else {
            item.style.display = "flex"
        }
    }

    const renderRecords = () => {

        if (!convertedJson) {
            return null;
        }

        const records = convertedJson.nfeProc.NFe.infNFe.det;
        if (!records) {
            return null;
        }

        return (
            <div className="table-json-result-div">
                <table className="table-json-result">
                    <thead>
                        <tr>
                            <th>Registro</th>
                            <th>Descrição</th>
                            <th>Qtde</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record._attributes.nItem}</td>
                                <td>{record.prod.xProd._text}</td>
                                <td>{formatValue(record.prod.qCom._text, 'integer')}</td>
                                <td>{formatValue(record.prod.vUnTrib._text, 'currency')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="ImportacaoNF">
            <Header />
            <SideBar />
            <ModalImportacaoNF showModal={showModal} convertedJson={convertedJson}/>

            <div className="import-container">
                <div className="import-container-upload">
                    <h2>Importar NF</h2>
                    <input type="file" accept=".xml" onChange={handleFileChange} />
                </div>

                {convertedJson && (
                    <div className="json-results">
                        <h3>Relatório de Produtos</h3>
                        {renderRecords()}
                    </div>
                )}

                <button className="btn btn-add-produto" onClick={showModal}>Confirmar</button>
            </div>
        </div>
    );
}
