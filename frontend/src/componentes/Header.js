import '../styles/Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {

  const navigate = useNavigate();

  const logout = () => {
    if(window.confirm("Você tem certeza que deseja sair do sistema?")) {
      toast.success("Deslogado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 500)
    }
  }

  return (
    <div className="Header">

      <div className="header-container">
        <div className="center">
          <Link to="/home">
            <h1 className="header-logo left">StockEasy</h1>
          </Link>
          <i className="fa fa-power-off right" aria-hidden="true" onClick={() => logout()}><span>Sair</span></i>
        </div>
      </div>

    </div>
  );
}