import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';
import '../styles/EditarUsuario.css';

const EditarSetor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [setor, setSetor] = useState({ nome_setor: '' });

  useEffect(() => {
    const getSetor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getSetor/${id}`);
        const { nome_setor } = response.data;
        setSetor({ nome_setor });
      } catch (error) {
        console.log(error);
      }
    };
    getSetor();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/editarSetor/${id}`, setor);
      toast.success('Setor atualizado com sucesso.');
      navigate('/setor');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao atualizar o setor.');
    }
  };

  return (
    <div>
      <Header />
      <SideBar />
      <div className="formulario-editar">
        <h2>Edição de Setor</h2>
        <form className="form-edit" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome_setor">Nome:</label>
            <input
              type="text"
              id="nome_setor"
              name="nome_setor"
              value={setor.nome_setor}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EditarSetor;