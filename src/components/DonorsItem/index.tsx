import whatsappIcon from '../../assets/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

export interface Donor {
  avatar: string;
  bio: string;
  blood: string;
  convenio: string;
  id: number;
  name: string;
  whatsapp: string;
}

interface DonorsItemProps {
  donor: Donor;
}

const DonorsItem: React.FC<DonorsItemProps> = ({ donor }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: donor.id,
    });
  }

  return (
    <article className="donors-item">
      <header>
        <img src={donor.avatar} alt={donor.name} />
        <div>
          <strong>{donor.name}</strong>
          <span>{donor.blood}</span>
        </div>
      </header>

      <p>{donor.bio}</p>

      <footer>
        <p>
          Convenio:
          <strong>{donor.convenio}</strong>
        </p>
        <a
          // target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${donor.whatsapp}`}
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default DonorsItem;
