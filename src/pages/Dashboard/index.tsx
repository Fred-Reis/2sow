import React, { useEffect, useCallback, useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';

import Header from 'src/components/Header';
import Button from 'src/components/Button';

import { useAuth } from 'src/hooks/auth';

import api from 'src/services/api';

import {
  Container,
  Content,
  CardProfile,
  TableContainer,
  ButtonsContainer,
} from './styles';

interface UserAddress {
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
}
interface PeopleProps {
  id?: string;
  token?: string;
  avatar?: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  endereco: UserAddress;
}

const Dashboard: React.FC = () => {
  const [peoples, setPeoples] = useState<PeopleProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const loadPeoples = async (): Promise<void> => {
      try {
        const response = await api.get('/peoples');

        setPeoples(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadPeoples();
  }, []);

  const handleRemove = useCallback(async (id) => {
    console.log('aqui no remove', id);
    await api.delete(`/peoples/${id}`);

    setPeoples((state) => state.filter((people) => people.id !== id));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <CardProfile>
            <img
              src="data:image/jpeg;base64,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"
              alt="profile"
            />

            <strong>{user.nome}</strong>
            <Button type="button">Ver Perfil</Button>
          </CardProfile>

          <TableContainer>
            <input type="text" placeholder="Procure pelo nome" />

            <ul>
              <h1>Veja quem está à bordo:</h1>
              {peoples.map((people) => (
                <li key={people.id}>
                  <img
                    className="avatar"
                    src="data:image/jpeg;base64,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"
                  />
                  <div>
                    <label>NOME</label>
                    <p>{people.nome}</p>
                  </div>
                  <div>
                    <label>CPF</label>
                    <p>{people.cpf}</p>
                  </div>
                  <div>
                    <label>E-MAIL</label>
                    <p>{people.email}</p>
                  </div>
                  <div>
                    <label>CIDADE</label>
                    <p>{people.endereco.cidade}</p>
                  </div>

                  <ButtonsContainer>
                    <button onClick={() => handleRemove(people.id)}>
                      <FiX size={20} />
                    </button>
                    <button>
                      <FiEdit size={20} />
                    </button>
                  </ButtonsContainer>
                </li>
              ))}
            </ul>
          </TableContainer>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
