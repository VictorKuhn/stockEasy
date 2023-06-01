import React from 'react'
import Header from '../componentes/Header.js'
import SideBar from '../componentes/SideBar.js'
import '../styles/Home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <div className="divBackground">
        <div className="divContent">
          <div className="contents">
            <h1>TESTANDO 1</h1>
          </div>
          <div className="contents">
          <h1>TESTANDO 2</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home