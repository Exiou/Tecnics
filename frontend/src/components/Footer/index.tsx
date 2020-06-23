import React from 'react';

import './styles.css'

import facebookIcon from '../../assets/svgs/facebook.svg'
import whatsappIcon from '../../assets/svgs/whatsapp.svg'
import githubIcon from '../../assets/svgs/github.svg'
import twitterIcon from '../../assets/svgs/twitter.svg'

const Footer: React.FC = () => {
  
  return (
    <div className="Footer">
        <footer>
          <a href="/">
            <img src={whatsappIcon} alt="Whatsapp Icon" height={16} width={16} />
          </a>
          <a href="https://twitter.com/exiouuu">
            <img src={twitterIcon} alt="Twitter Icon" height={16} width={16} />
          </a>
          <a href="/">
            <img src={facebookIcon} alt="Facebook Icon" height={16} width={16} />
          </a>
          <a href="https://github.com/Exiou">
            <img src={githubIcon} alt="Github Icon" height={16} width={16} />
          </a>
        </footer>
    </div>
  );
}

export default Footer;
