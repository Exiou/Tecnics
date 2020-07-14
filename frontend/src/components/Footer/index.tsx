import React from 'react';
import { useHistory } from 'react-router-dom'

import './styles.css'

import facebookIcon from '../../assets/svgs/facebook.svg'
import whatsappIcon from '../../assets/svgs/whatsapp.svg'
import githubIcon from '../../assets/svgs/github.svg'
import twitterIcon from '../../assets/svgs/twitter.svg'

const Footer: React.FC = () => {

  const history = useHistory()

  async function handleLojas() {
    const id = prompt('Insira o id da sua loja!')

    if(id) {
      localStorage.setItem('idloja', String(id))
      history.push('/lojas/processadores')
    }
  }
  
  return (
    <div className="Footer">
        <footer>

          <button onClick={handleLojas}>
            Lojas
          </button>

          <nav>
            <a href="/">
              <img src={whatsappIcon} alt="Whatsapp Icon" height={16} width={16} />
            </a>
            <a href="https://twitter.com/tecnics">
              <img src={twitterIcon} alt="Twitter Icon" height={16} width={16} />
            </a>
            <a href="https://facebook.com/tecnics">
              <img src={facebookIcon} alt="Facebook Icon" height={16} width={16} />
            </a>
            <a href="https://github.com/Exiou">
              <img src={githubIcon} alt="Github Icon" height={16} width={16} />
            </a>
          </nav>
        </footer>
    </div>
  );
}

export default Footer;
