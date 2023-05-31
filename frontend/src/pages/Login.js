import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ usuario: '', senha: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      const { success } = response.data;

      if (success) {
        // Login bem-sucedido, redirecionar para a página desejada
        navigate('/home');
      } else {
        // Credenciais inválidas
        toast.error('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (error) {
      // Erro ao fazer a requisição
      console.error(error);
      toast.error('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="Login">
      <div className="center">
        <div className="login-box">
          <h1 className="login-logo">StockEasy</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="usuario"
              className="input-write"
              type="text"
              placeholder="Usuário..."
              value={credentials.usuario}
              onChange={handleInputChange}
            />
            <input
              name="senha"
              className="input-write"
              type="password"
              placeholder="Senha..."
              value={credentials.senha}
              onChange={handleInputChange}
            />
            <input className="input-send" type="submit" value="ENTRAR" />
            <a href="/">
              <p>Esqueci minha senha</p>
            </a>
          </form>
        </div>
      </div>
      <div className="wave1"></div>
      <div className="wave2"></div>
      <div className="wave3"></div>
      <div className="wave4"></div>
      <div className="wave5"></div>
      <div className="wave6"></div>
      <div className="wave7"></div>

      <div className="wave_star1"></div>
      <div className="wave_star2"></div>
      <div className="wave_star3"></div>
      <div className="wave_star4"></div>
      <div className="wave_star5"></div>
      <div className="wave_star6"></div>
    </div>
  );
};

export default Login;
