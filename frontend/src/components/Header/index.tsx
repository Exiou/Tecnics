import React from 'react';
import { Link } from 'react-router-dom'


import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import avatarIcon from '../../assets/svgs/avatar.svg'
import downArrow from '../../assets/svgs/down-arrow.svg'

interface Props {
    product?: string
}

const Header: React.FC<Props> = ({ product }) => {

    const userId = localStorage.getItem('userId')    
  
    return (
        <div className="Header">
            <header>
                <Link to="/" className="logo">
                    <img id="tecnicsLogo" src={tecnicsLogo} alt="Tecnics Logo" />
                </Link>
                { product ? <h1>{product.charAt(0).toUpperCase() + product.slice(1)}<img src={downArrow} alt="down arrow"/></h1>
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
