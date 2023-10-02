import './SideBar.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function SideBar() {
  const [nivelAcesso, setNivelAcesso] = useState(0);

  useEffect(() => {
    const nivelAcessoUsuario = localStorage.getItem('nivel_acesso_usuario');
    setNivelAcesso(Number(nivelAcessoUsuario));
  }, []);

  return (
    <div className="SideBar">
      <div className="sidebar-container">
        <ul className="sidebar-ul">
          <i className="fa-solid fa-bars"></i>
          <Link to="/produtos">
            <li><i className="fa-solid fa-box-open"></i><span>Produtos</span></li>
          </Link>
          <Link to="/importacaoNF">
            <li><i className="fa-solid fa-circle-plus"></i><span>Importar NF</span></li>
          </Link>
          <Link to="/requisicoesRecusadas">
            <li><i class="fa-solid fa-circle-xmark"></i><span>Requisições recusadas</span></li>
          </Link>
          <Link to="/monitoramentoRT">
            <li><i className="fa-solid fa-right-left"></i><span>Transferências</span></li>
          </Link>
          {nivelAcesso === 1 && (
            <Link to="/usuarios">
              <li><i className="fa-solid fa-users"></i><span>Usuários</span></li>
            </Link>
          )}
          {nivelAcesso === 1 && (
            <Link to="/setor">
              <li><i class="fa-solid fa-warehouse"></i><span>Setores</span></li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}