import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';
import api from '../services/api';

interface CreateUserState {
  user: object;
}

interface RemoveCredentials {
  id: string;
}

interface CreateUserContextDTO {
  user: object;
  createUser(credentials: ICreateUsersDTO): Promise<void>;
  removeUser(credentials: RemoveCredentials): Promise<void>;
}

const CreateUserContext = createContext<CreateUserContextDTO>(
  {} as CreateUserContextDTO,
);

export const CreateUserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('');

  const [data, setData] = useState<CreateUserState>({} as CreateUserState);

  const createUser = useCallback(async (credentials: ICreateUsersDTO) => {
    const response = await api.get('/peoples');

    const users = response.data;

    const userAlreadyExist = users.find(
      (user: any) => user.email === credentials.email,
    );

    if (userAlreadyExist) {
      throw new Error('Já existe um cadastro com esse endereço de e-mail.');
    }

    console.log('credentials', credentials);

    const form = {
      nome: credentials.nome,
      cpf: credentials.cpf,
      email: credentials.email,
      password: credentials.senha,
      token: uuid(),
      endereco: {
        cep: credentials.cep,
        rua: credentials.rua,
        numero: credentials.numero,
        bairro: credentials.bairro,
        cidade: credentials.cidade,
      },
    };

    const res = await api.post(
      '/peoples',

      form,
    );

    setToken(res.data.token);
    setData(res.data);

    localStorage.setItem('@NewWorld:user', JSON.stringify(res.data));
    localStorage.setItem('@NewWorld:token', res.data.token);
  }, []);

  const removeUser = useCallback(async ({ id }: RemoveCredentials) => {
    const response = await api.delete(`/peoples/${id}`);
  }, []);

  return (
    <CreateUserContext.Provider value={{ user: data, createUser, removeUser }}>
      {children}
    </CreateUserContext.Provider>
  );
};

export function useCreate(): CreateUserContextDTO {
  const context = useContext(CreateUserContext);

  if (!context) {
    throw new Error('useCreate must be used withim CreateProvider');
  }
  return context;
}
