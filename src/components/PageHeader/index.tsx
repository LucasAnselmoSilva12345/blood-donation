import { Link } from 'react-router-dom';

import logoImg from '../../assets/Logo1P.png';
import backIcon from '../../assets/icons/back.svg';

import './styles.css';

/* Exemplo de tipagem para os title*/
interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="Blood" />
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}

        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
