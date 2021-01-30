import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import logo1 from '../../assets/logo4.png';

import blood1 from '../../assets/blood1.jpg';

import './styles.css';

import purpleHeartIcon from '../../assets/icons/purple-heart.svg';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo1} alt="Blood Donation" />
          <h2>A plataforma dos salvadores de vida</h2>
        </div>
        <img src={blood1} alt="Imagem" className="hero-image" />
        <div className="buttons-container">
          <Link to="/search" className="find_donor">
            Encontre um doador
          </Link>
          <Link to="/donate" className="be_donor">
            Seja um doador
          </Link>
        </div>
        <span className="totals-connections">
          Total de {totalConnections} vidas já salvas{' '}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
