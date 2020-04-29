import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import hamburgerIcon from '../../assets/svgs/hamburger-menu.svg'
import processadorIcon from '../../assets/svgs/processador.svg'
import placaVideoIcon from '../../assets/svgs/placa-de-video.svg'
import placaMaeIcon from '../../assets/svgs/placa-mae.svg'
import memoriaIcon from '../../assets/svgs/memoria.svg'
import gabineteIcon from '../../assets/svgs/gabinete.svg'
import fonteIcon from '../../assets/svgs/fonte.svg'
import coolerIcon from '../../assets/svgs/cooler.svg'
import armazenamentoIcon from '../../assets/svgs/armazenamento.svg'
import facebookIcon from '../../assets/svgs/facebook.svg'
import whatsappIcon from '../../assets/svgs/whatsapp.svg'
import githubIcon from '../../assets/svgs/github.svg'
import twitterIcon from '../../assets/svgs/twitter.svg'

export default class Main extends Component {
    render() {
        return(
            <>
                <header>
                    <img className="tecnicsLogo" src={tecnicsLogo} alt="Tecnics Logo" />
                    <button className="hamburgerButton"><img className="hamburgerMenu" src={hamburgerIcon} alt="Hamburger Icon"/></button>
                </header>
                <div className="menu">
                    <button><img src={processadorIcon} alt="Processador Icon"/> Processadores</button>
                    <button><img src={placaVideoIcon} alt="Placa de Vídeo Icon"/> Placas de Vídeo</button>
                    <button><img src={placaMaeIcon} alt="Placa Mãe Icon"/> Placas mãe</button>
                    <button><img src={memoriaIcon} alt="Memoria Icon"/> Memórias</button>
                    <button><img src={gabineteIcon} alt="Gabinete Icon"/> Gabinetes</button>
                    <button><img src={fonteIcon} alt="Fonte Icon"/> Fontes</button>
                    <button><img src={coolerIcon} alt="Cooler Icon"/> Coolers</button>
                    <button><img src={armazenamentoIcon} alt="Armazenamento Icon"/> Armazenamentos</button>
                </div>
                <footer>
                    <button><img src={whatsappIcon} alt="Whatsapp Icon" height={16} width={16} /></button>
                    <button><img src={twitterIcon} alt="Twitter Icon" height={16} width={16} /></button>
                    <button><img src={facebookIcon} alt="Facebook Icon" height={16} width={16} /></button>
                    <button><img src={githubIcon} alt="Github Icon" height={16} width={16} /></button>
                </footer>
            </>
        )
    }
}