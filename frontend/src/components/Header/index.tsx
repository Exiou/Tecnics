import React from 'react';

import './styles.css'

import tecnicsLogo from '../../assets/tecnics-logo.png'
import hamburgerIcon from '../../assets/svgs/hamburger-menu.svg'
import avatarIcon from '../../assets/svgs/avatar.svg'

const Header: React.FC = () => {
  
  return (
    <div className="Header">
        <header>
            <a href="/" className="logo">
                <img id="tecnicsLogo" src={tecnicsLogo} alt="Tecnics Logo" />
            </a>
            <div className="header-right">
                <a href="/profile" id="avatarButton">
                    <img className="avatar" src={avatarIcon} alt="Avatar Icon"/>
                </a>
                <a href="/" id="hamburgerButton">
                    <img className="hamburger" src={hamburgerIcon} alt="Hamburger Icon"/>
                </a>
            </div>
        </header>
    </div>
  );
}

export default Header;
