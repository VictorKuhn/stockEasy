import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

export default function Header() {

  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome_usuario');
  const id = localStorage.getItem('id_usuario');
  const dark_mode = localStorage.getItem('dark_mode');

  const logout = () => {
    if (window.confirm("Você tem certeza que deseja sair do sistema?")) {
      localStorage.removeItem('id_usuario')
      localStorage.removeItem('nome_usuario')
      localStorage.removeItem('nivel_acesso_usuario')
      toast.success("Deslogado com sucesso!");
      setTimeout(() => {
        navigate("/");
      }, 500)
    }
  }

  const darkMode = () => {
    if (localStorage.getItem('dark_mode') == 1) {
      axios.put(`http://localhost:5000/api/editarDarkMode/${id}/2`)
        .then((response) => {
          toast.success("Dark Mode alterado com sucesso.");
        })
      localStorage.setItem('dark_mode', 2);
      window.location.reload(true);
    } else if (localStorage.getItem('dark_mode') == 2) {
      axios.put(`http://localhost:5000/api/editarDarkMode/${id}/1`)
        .then((response) => {
          toast.success("Dark Mode alterado com sucesso.");
        })
      localStorage.setItem('dark_mode', 1);
      window.location.reload(true);
    } else {
      console.log("Erro no sistema.")
    }
  }

  return (
    <div className="Header">
      <div className="header-container" >
        <div className="header-container-comps">
          <Link to="/home">
            <h1 className="header-logo left">StockEasy</h1>
          </Link>
          <h2 className="header-welcome">Seja bem vindo, <span>{nomeUsuario}</span></h2>

          <i class="fa-solid fa-circle-half-stroke right" style={{marginRight: "50px"}} onClick={() => darkMode()}></i>
          <i className="fa fa-power-off right" aria-hidden="true" onClick={() => logout()}><span>Sair</span></i>

        </div>
      </div>
    </div>
  );
}