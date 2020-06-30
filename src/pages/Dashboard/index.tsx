import React, { useEffect, useCallback, useState, useRef } from 'react';
import InfiniteLoading from 'react-simple-infinite-loading';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiX } from 'react-icons/fi';

import BeatLoader from 'react-spinners/BeatLoader';
import FadeLoader from 'react-spinners/FadeLoader';
import ClipLoader from 'react-spinners/ClipLoader';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';

import Header from 'src/components/Header';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

import { useAuth } from 'src/hooks/auth';
import { useToast } from 'src/hooks/toast';

import api from 'src/services/api';

import {
  Container,
  Content,
  CardProfile,
  TableContainer,
  ButtonsContainer,
  InputContainer,
  override,
  CustomButton,
  buttonCard,
} from './styles';

interface LoadUser {
  nome: string;
}

const Dashboard: React.FC = () => {
  const [peoples, setPeoples] = useState<ICreateUsersDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  const formRef = useRef<FormHandles>(null);

  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    const loadPeoples = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await api.get('/peoples?_page=1&_limit=5');

        setPeoples(response.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    loadPeoples();
  }, []);

  const handleSubmit = useCallback(async (data: LoadUser): Promise<void> => {
    try {
      const response = await api.get(
        `/peoples${data.nome.length === 0 ? '/' : `/?nome=${data.nome}`}`,
      );

      if (response.data.length < 1) {
        addToast({
          type: 'error',
          title: 'Usuário não encontrado',
          description: 'Tente novamente!',
        });
        return;
      }

      setPeoples(response.data);
    } catch (err) {
      console.log(err);

      addToast({
        type: 'error',
        title: 'Ocorreu um erro',
        description: err,
      });
    }
  }, []);

  const handleRemove = useCallback(
    async (id) => {
      setLoading(true);

      await api.delete(`/peoples/${id}`);

      setPeoples((state) => state.filter((people) => people.id !== id));

      addToast({
        type: 'error',
        title: 'Usuário removido',
      });

      // if (peoples.length < 1) {
      //   signOut();
      // }
      setLoading(false);
    },
    [addToast],
  );

  const loadMorePeoples = async () => {
    setLoading(true);
    const response = await api.get(`/peoples?_page=${count}&_limit=5`);

    const newPeoples = response.data;

    setCount(count + 1);

    setPeoples([...peoples, ...newPeoples]);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <CardProfile>
            <img src={user.avatar} alt="profile" />

            <strong>{user.nome}</strong>
            <Button
              disabled={!!loading}
              type="button"
              onClick={() => history.push('/profile', { user, id: 'user' })}
            >
              Ver Perfil
            </Button>
          </CardProfile>

          <TableContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <InputContainer>
                <Input
                  name="nome"
                  type="text"
                  placeholder="Procure pelo nome"
                />
              </InputContainer>
            </Form>

            <ul>
              {loading && (
                <BeatLoader css={override} size={20} color={' #1e0041'} />
              )}

              <h1>Veja quem está à bordo:</h1>
              <div style={{ height: '57vh' }}>
                <InfiniteLoading
                  hasMoreItems
                  itemHeight={170}
                  loadMoreItems={loadMorePeoples}
                >
                  {peoples.map((people) => (
                    <li key={people.id}>
                      <img className="avatar" src={people.avatar} />
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
                        <CustomButton
                          disabled={!!loading}
                          onClick={() => handleRemove(people.id)}
                        >
                          {loading ? (
                            <ClipLoader
                              css={buttonCard}
                              size={20}
                              color={'#c53030'}
                            />
                          ) : (
                            <FiX size={20} />
                          )}
                        </CustomButton>
                        <CustomButton
                          disabled={!!loading}
                          onClick={() =>
                            history.push('/profile', {
                              user: people,
                              id: 'update',
                            })
                          }
                        >
                          {loading ? (
                            <ClipLoader
                              css={buttonCard}
                              size={20}
                              color={'#00c94d'}
                            />
                          ) : (
                            <FiEdit size={20} />
                          )}
                        </CustomButton>
                      </ButtonsContainer>
                    </li>
                  ))}
                </InfiniteLoading>
              </div>
            </ul>
          </TableContainer>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
