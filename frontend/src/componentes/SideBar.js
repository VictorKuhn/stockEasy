import '../styles/SideBar.css';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="SideBar">
      <div className="sidebar-container">
        <ul className="sidebar-ul">
          <i class="fa-solid fa-bars"></i>
          <Link to="/produtos">
            <li><i class="fa-solid fa-box-open"></i><span>Produtos</span></li>
          </Link>
          <Link to="/importacaoNF">
            <li><i class="fa-solid fa-circle-plus"></i><span>Importar NF</span></li>
          </Link>
          <Link to="">
            <li><i class="fa-solid fa-right-left"></i><span>Transferências</span></li>
          </Link>
          <Link to="/usuarios">
            <li><i class="fa-solid fa-users"></i><span>Usuários</span></li>
          </Link>
        </ul>
      </div>
    </div>
  );
}