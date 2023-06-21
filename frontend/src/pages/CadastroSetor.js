import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';

const CadastroSetor = () => {
  const navigate = useNavigate();
  const [setor, setSetor] = useState({ nome_setor: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetor((prevSetor) => ({
      ...prevSetor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cadastrarSetor', setor);
      toast.success('Setor cadastrado com sucesso.');
      navigate('/setor');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar o setor.');
    }
  };

  return (
    <div>
      <Header />
      <SideBar />

      <div className="formulario-cadastrar">
        <h2>Cadastro de Setor</h2>
        <form className="form-cadastro" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome_setor">Nome do Setor:</label>
            <input
              type="text"
              id="nome_setor"
              name="nome_setor"
              value={setor.nome_setor}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroSetor;
