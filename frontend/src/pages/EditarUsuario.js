import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../styles/EditarUsuario.css';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    login_usuario: '',
    nome_usuario: '',
    senha_usuario: '',
    nivel_acesso_usuario: '',
    setor_usuario: '',
  });
  const [setores, setSetores] = useState([]);

  useEffect(() => {
    const getUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getUsuarios/${id}`);
        const { login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, setor_usuario } = response.data;
        setUsuario({ login_usuario, nome_usuario, senha_usuario, nivel_acesso_usuario, setor_usuario });
      } catch (error) {
        console.log(error);
      }
    };
    getUsuario();
  }, [id]);

  useEffect(() => {
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getSetores');
      setSetores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/editarUsuario/${id}`, usuario);
      toast.success('Usuário atualizado com sucesso.');
      navigate('/usuarios');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao atualizar o usuário.');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <SideBar />
      <div className="formulario-editar">
        <h2>Edição de Usuário</h2>
        <form className="form-edit" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login_usuario">Login:</label>
            <input
              type="text"
              id="login_usuario"
              name="login_usuario"
              value={usuario.login_usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nome_usuario">Nome:</label>
            <input
              type="text"
              id="nome_usuario"
              name="nome_usuario"
              value={usuario.nome_usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="senha_usuario">Senha:</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="senha_usuario"
                name="senha_usuario"
                value={usuario.senha_usuario}
                onChange={handleChange}
                required
              />
              <i onClick={handleTogglePassword} className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
            </div>
          </div>
          <div>
            <label htmlFor="nivel_acesso_usuario">Nível de Acesso:</label>
            <select
              className="nivel_acesso_usuario_select"
              id="nivel_acesso_usuario"
              name="nivel_acesso_usuario"
              value={usuario.nivel_acesso_usuario}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="1">Administrador</option>
              <option value="2">Funcionário</option>
            </select>
          </div>
          <div>
            <label htmlFor="setor_usuario">Setor:</label>
            <select
              className="setor_usuario_select"
              id="setor_usuario"
              name="setor_usuario"
              value={usuario.setor_usuario}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              {setores.map((setor) => (
                <option key={setor.id_setor} value={setor.id_setor}>
                  {setor.nome_setor}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;
