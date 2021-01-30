import { FormEvent, useState } from 'react';
import DonorsItem, { Donor } from '../../components/DonorsItem';
import Input from '../../components/Input/Index';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select/Index';
import api from '../../services/api';
import './styles.css';

function ListaDoadores() {
  const [donors, setDonors] = useState([]);

  const [blood, setBlood] = useState('');
  // const [conve, setConve] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchDonors(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('donation', {
      params: {
        blood,
        week_day,
        time,
      },
    });

    setDonors(response.data);
  }

  return (
    <div id="page-donors-list" className="container">
      <PageHeader title="Estes são os salvadores disponíveis.">
        <form id="search-donors" onSubmit={searchDonors}>
          <Select
            name="blood"
            label="Seu Tipo Sanguineo"
            value={blood}
            onChange={(e) => {
              setBlood(e.target.value);
            }}
            options={[
              { value: 'A positivo', label: 'A positivo' },
              { value: 'A negativo', label: 'A negativo' },
              { value: 'B positivo', label: 'B positivo' },
              { value: 'B negativo', label: 'B negativo' },
              { value: 'AB positivo', label: 'AB positivo' },
              { value: 'AB negativo', label: 'AB negativo' },
              { value: 'O positivo', label: 'O positivo' },
              { value: 'O negativo', label: 'O negativo' },
            ]}
          />

          {/* <Select
            name="conve"
            label="Convenio"
            value={conve}
            onChange={(e) => {
              setConve(e.target.value);
            }}
            options={[
              { value: 'Sul', label: 'Sul America' },
              { value: 'Uni', label: 'Unimed' },
              { value: 'Iamspe', label: 'Iamspe' },
              { value: 'SUS', label: 'SUS' },
            ]}
          /> */}

          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Horario"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {donors.map((donor: Donor) => {
          return <DonorsItem key={donor.id} donor={donor} />;
        })}
      </main>
    </div>
  );
}

export default ListaDoadores;
