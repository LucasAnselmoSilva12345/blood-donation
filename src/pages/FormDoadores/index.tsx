import { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Input from '../../components/Input/Index';
import PageHeader from '../../components/PageHeader';

import './styles.css';

import warningIcon from '../../assets/icons/warning.svg';
import Textarea from '../../components/Textarea/Index';
import Select from '../../components/Select/Index';
import api from '../../services/api';

function FormDoadores() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [blood, setBlood] = useState('');
  const [conve, setConve] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, horario: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, horario: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItem);
  }

  function handleCreateDonors(e: FormEvent) {
    e.preventDefault();

    api
      .post('donation', {
        name,
        avatar,
        whatsapp,
        bio,
        blood,
        convenio: conve,
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  return (
    <div id="page-donors-form" className="container">
      <PageHeader
        title="Que incrivel que você quer salvar vidas!"
        description="O primeiro passo, é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateDonors}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Sua Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre seu Sangue</legend>

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
            <Input
              name="conve"
              label="Seu Convenio medico"
              value={conve}
              onChange={(e) => {
                setConve(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="scheduleItem">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
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
                    name="horario"
                    label="Das"
                    type="time"
                    value={scheduleItem.horario}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'horario', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default FormDoadores;
