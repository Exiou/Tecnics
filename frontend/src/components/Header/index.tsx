import React from 'react';
import { Link } from 'react-router-dom'


import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import hamburgerIcon from '../../assets/svgs/hamburger-menu.svg'
import avatarIcon from '../../assets/svgs/avatar.svg'
import downArrow from '../../assets/svgs/down-arrow.svg'

interface Props {
    product?: string
}

const Header: React.FC<Props> = ({ product }) => {
  
  return (
    <div className="Header">
        <header>
            <Link to="/" className="logo">
                <img id="tecnicsLogo" src={tecnicsLogo} alt="Tecnics Logo" />
            </Link>
            { product ?
                <h1>{product.charAt(0).toUpperCase() + product.slice(1)}<img src={downArrow} alt="down arrow"/></h1>
                :
                ''
            }
            <nav>
                <Link to="/profile" id="avatarButton">
                    <img className="avatar" src={avatarIcon} alt="Avatar Icon"/>
                </Link>
                <Link to="/" id="hamburgerButton">
                    <img className="hamburger" src={hamburgerIcon} alt="Hamburger Icon"/>
                </Link>
            </nav>
        </header>
    </div>
  );
}

export default Header;
