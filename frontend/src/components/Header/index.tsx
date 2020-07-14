import React, { ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'


import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import avatarIcon from '../../assets/svgs/avatar.svg'

interface Props {
    product?: string
}

const Header: React.FC<Props> = ({ product }) => {

    const history = useHistory()

    const userId = localStorage.getItem('userId')

    async function handleSelectProduct(event: ChangeEvent<HTMLSelectElement>){
        const { value } = event.target

        if (value) history.push(`./${value}`)
    }
  
    return (
        <div className="Header">
            <header>
                <Link to="/" className="logo">
                    <img id="tecnicsLogo" src={tecnicsLogo} alt="Tecnics Logo" />
                </Link>
                { product ?
                    <select name="selectProduct" id="selectProduct" onChange={handleSelectProduct}>
                        <option value="">Selecionar Produto</option>
                        <option value="processadores">Processadores</option>
                        <option value="placas-video">Placas de vídeo</option>
                        <option value="placas-mae">Placas mãe</option>
                        <option value="memorias">Memórias</option>
                        <option value="gabinetes">Gabinetes</option>
                        <option value="fontes">Fontes</option>
                        <option value="coolers">Coolers</option>
                        <option value="armazenamentos">Armazenamentos</option>
                    </select>
                    : ''
                }
                {
                    userId ? (
                        <nav>
                            <Link to="/users/profile" id="avatarButton">
                                <img className="avatar" src={avatarIcon} alt="Avatar Icon"/>
                            </Link>
                            <Link to="/" className="text" onClick={() => (localStorage.removeItem('userId'))}>
                                <span>Sair</span>
                            </Link>
                        </nav>
                    ) : (
                        <nav>
                            <Link to="/users/login" className="text">
                                <span>Entrar</span>
                            </Link>
                            <Link to="/users/register" className="text">
                                <span>Cadastrar</span>
                            </Link>
                        </nav>
                    )
                }
            </header>
        </div>
    );
}

export default Header;
