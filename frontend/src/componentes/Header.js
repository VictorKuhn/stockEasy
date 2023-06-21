import '../styles/Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Header() {

  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome_usuario');

  const logout = () => {
    if(window.confirm("Você tem certeza que deseja sair do sistema?")) {
      localStorage.removeItem('nome_usuario')
      toast.success("Deslogado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 500)
    }
  }

  return (
    <div className="Header">

      <div className="header-container">
        <div className="header-container-comps">
          <Link to="/home">
            <h1 className="header-logo left">StockEasy</h1>
          </Link>
          <h2 className="header-welcome">Seja bem vindo, <span>{nomeUsuario}</span></h2>
          <i className="fa fa-power-off right" aria-hidden="true" onClick={() => logout()}><span>Sair</span></i>
        </div>
      </div>

    </div>
  );
}