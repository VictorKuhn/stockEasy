import '../styles/SideBar.css';
import { Link } from 'react-router-dom';

export default function SideBar() {
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
          <Link to="">
            <li><i className="fa-solid fa-right-left"></i><span>Transferências</span></li>
          </Link>
          <Link to="/usuarios">
            <li><i className="fa-solid fa-users"></i><span>Usuários</span></li>
          </Link>
          <Link to="/setor">
            <li><i class="fa-solid fa-warehouse"></i><span>Setores</span></li>
          </Link>
        </ul>
      </div>
    </div>
  );
}