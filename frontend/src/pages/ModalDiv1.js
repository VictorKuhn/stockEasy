import React from 'react'
import '../styles/ModalDiv.css';

const ModalDiv1 = (props) => {
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

    return (
        <div className="tables-divsOverflow">
            <table className="table-resultados">
                <thead>
                    <tr>
                        <th>Registro</th>
                        <th>Descrição</th>
                        <th>Qtde</th>
                        <th>Valor</th>
                        <th>Aux</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.records.map((record, index) => (
                        <tr key={index}>
                            <td>{record._attributes.nItem}</td>
                            <td>{record.prod.xProd._text}</td>
                            <td>{formatValue(record.prod.qCom._text, 'integer')}</td>
                            <td>{formatValue(record.prod.vUnTrib._text, 'currency')}</td>
                            <td className="searchCodAux" onClick={props.showDiv2}><i class="fa-solid fa-magnifying-glass"></i></td>
                            <td className="stateIcon"><i class="fa-solid fa-check"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ModalDiv1