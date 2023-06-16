import React from 'react'

const ResetNF = (props) => {
    return (
        <div className="json-results" >
            <h3>Relatório de Produtos</h3>
            {props.renderRecords()}
        </div>
    )
}

export default ResetNF