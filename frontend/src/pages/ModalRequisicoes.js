import '../styles/ModalRequisicoes.css';

const ModalRequisicoes = (props) => {

    return (
        <>
            <div className="modalBackground">
                <div className="modalStructure">
                    <div className="modalTitle">
                        <h1>Inserção de Requisições</h1>
                    </div>
                    <div className="modalContent">
                        <form action="" className="modalForm">
                            <div>
                                <label htmlFor="login_usuario">Usuário:</label>
                                <input value={props.nome_usuario} disabled/>
                            </div>
                            <div>
                                <label htmlFor="nome_usuario">Código do Produto:</label>
                                <input required/>
                            </div>
                            <div>
                                <label htmlFor="senha_usuario">Nome do Produto:</label>
                                <input value={props.nome_produto} disabled/>
                            </div>
                            <div>
                                <label htmlFor="senha_usuario">Quantidade Requisitada:</label>
                                <input required/>
                            </div>
                            <div>
                                <label htmlFor="senha_usuario">Quantidade no Estoque:</label>
                                <input value={props.qtd_estoque} disabled/>
                            </div>
                        </form>
                    </div>
                    <div className="modalBottom">
                        <div>
                            <button type="submit" style={{ backgroundColor: "#ff0000" }}><i class="fa-solid fa-trash"></i></button>
                            <button type="submit" style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalRequisicoes