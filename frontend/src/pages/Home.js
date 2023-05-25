import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Home.css';
import Header from '../componentes/Header';
import SideBar from '../componentes/SideBar';

const Home = () => {
    return (
        <div className="Home">
            <Header />
            <SideBar />
        </div>
    );
};

export default Home;
