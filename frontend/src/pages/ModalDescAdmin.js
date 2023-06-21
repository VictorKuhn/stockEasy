import '../styles/ModalDescAdmin.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/EditarProduto.css';
import { localeData } from 'moment';

const ModalDescAdmin = (props) => {
    const [reqAccepted, setReqAccepted] = useState({
        id_requisicao: props.item.id_requisicao,
        desc_admin: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/updateRequisicoesParaRecusadas/${props.item.id_requisicao}`, reqAccepted)
            setReqAccepted({
                id_requisicao: props.item.id_requisicao,
                desc_admin: ""
            })
            props.showModal2()
            props.loadData()
            toast.success(`Requisição ${props.item.id_requisicao} reprovada com sucesso.`)
        } catch (error) {
            console.log(error);
            toast.error('Erro ao alterar a requisição para reprovada.')
        }
    };

    const cancelReq = () => {
        props.showModal2()

        toast.error('Alterações descartadas.');
    }

    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setReqAccepted((prevRequisicao) => ({
            ...prevRequisicao,
            [name]: value,
        }));
    }

    return (
        <>
            <div className="modalBackground2">
                <div className="modalStructure2">
                    <div className="modalTitle2">
                        <h1>Motivo da contestação:</h1>
                    </div>
                    <div className="modalContent2">
                        <form action="" className="modalForm2" onSubmit={handleSubmit}>
                            <div className="divModalContent">
                                <label htmlFor="nome_usuario">Usuário:</label>
                                <input
                                    disabled
                                    placeholder='Usuário'
                                    value={props.item.nome_usuario}
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="id_requisicao">Código da Requisição:</label>
                                <input
                                    type="text"
                                    id="id_requisicao"
                                    name="id_requisicao"
                                    value={props.item.id_requisicao}
                                    disabled
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="nome_produto">Nome do Produto:</label>
                                <input
                                    type="text"
                                    id="nome_produto"
                                    name="nome_produto"
                                    value={props.item.nome_produto}
                                    disabled
                                    placeholder='Nome do Produto'
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="qtd_produto">Quantidade Requisitada:</label>
                                <input
                                    type="text"
                                    id="qtd_produto"
                                    name="qtd_produto"
                                    value={props.item.qtd_produto}
                                    disabled
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="desc_status">Status do produto:</label>
                                <input
                                    type="text"
                                    id="desc_status"
                                    name="desc_status"
                                    value={props.item.desc_status}
                                    disabled
                                    placeholder='0'
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="desc_func">Descrição do Funcionário:</label>
                                <input
                                    type="text"
                                    id="desc_func"
                                    name="desc_func"
                                    value={props.item.desc_func}
                                    disabled
                                    placeholder='Breve descrição'
                                />
                            </div>
                            <div className="divModalContent2">
                                <label htmlFor="desc_admin">Descrição do Administrador:</label>
                                <input
                                    type="text"
                                    id="desc_admin"
                                    name="desc_admin"
                                    value={props.item.desc_admin}
                                    onChange={handleChange2}
                                    placeholder='Breve descrição'
                                />
                            </div>
                            <div className="modalBottom2">
                                <div>
                                    <button type="reset" style={{ backgroundColor: "#ff0000" }} onClick={cancelReq}><i class="fa-solid fa-trash"></i></button>
                                    <button type="submit" style={{ backgroundColor: "#4CAF50" }}><i class="fa-solid fa-check"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDescAdmin