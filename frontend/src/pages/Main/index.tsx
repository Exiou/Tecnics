import React from 'react';
//import api from './services/api'

import { Link } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import './styles.css'

import processadorIcon from '../../assets/svgs/processador.svg'
import placaVideoIcon from '../../assets/svgs/placa-de-video.svg'
import placaMaeIcon from '../../assets/svgs/placa-mae.svg'
import memoriaIcon from '../../assets/svgs/memoria.svg'
import gabineteIcon from '../../assets/svgs/gabinete.svg'
import fonteIcon from '../../assets/svgs/fonte.svg'
import coolerIcon from '../../assets/svgs/cooler.svg'
import armazenamentoIcon from '../../assets/svgs/armazenamento.svg'

function App() {
  
  return (
    <div className="App">

      <Header />

      <div className="menu">
          <Link className="button" to="/processadores">
            <img src={processadorIcon} alt="Processador Icon"/>
            <p>Processadores</p>
          </Link>
          <Link className="button" to="/placas-video">
            <img src={placaVideoIcon} alt="Placa de Vídeo Icon"/>
            <p>Placas de Vídeo</p>
          </Link>
          <Link className="button" to="/placas-mae">
            <img src={placaMaeIcon} alt="Placa Mãe Icon"/>
            <p>Placas mãe</p>
          </Link>
          <Link className="button" to="/memorias">
            <img src={memoriaIcon} alt="Memoria Icon"/>
            <p>Memórias</p>
          </Link>
          <Link className="button" to="/gabinetes">
            <img src={gabineteIcon} alt="Gabinete Icon"/>
            <p>Gabinetes</p>
          </Link>
          <Link className="button" to="/fontes">
            <img src={fonteIcon} alt="Fonte Icon"/>
            <p>Fontes</p>
          </Link>
          <Link className="button" to="/coolers">
            <img src={coolerIcon} alt="Cooler Icon"/>
            <p>Coolers</p>
          </Link>
          <Link className="button" to="/armazenamentos">
            <img src={armazenamentoIcon} alt="Armazenamento Icon"/>
            <p>Armazenamentos</p>
          </Link>
      </div>

      <Footer />

    </div>
  );
}

export default App;
