import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        props.setCont3(props.records.length)
    })

    const processData = (registro, desc, qtde, valor, index) => {
        props.itensCodAux.push({
            registro: registro,
            descricao: desc,
            qtde: qtde,
            valor: valor
        })
        props.qtdAux.push(qtde)
        props.setCont1(props.cont1+1)
        props.records.splice(index, 1)
        props.showDiv2()
    }

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
                        <tr key={index} className='selectedAux2'>
                            <td>{record._attributes.nItem}</td>
                            <td>{record.prod.xProd._text}</td>
                            <td>{formatValue(record.prod.qCom._text, 'integer')}</td>
                            <td>{formatValue(record.prod.vUnTrib._text, 'currency')}</td>
                            <td className="searchCodAux" onClick={
                                () => processData(record._attributes.nItem,
                                    record.prod.xProd._text,
                                    formatValue(record.prod.qCom._text, 'integer'),
                                    formatValue(record.prod.vUnTrib._text, 'currency'),
                                    index)
                            }>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </td>
                            <td className="stateIcon"><i class="fa-solid fa-spinner fa-spin-pulse"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ModalDiv1