import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';
import api from '../services/api';

interface RemoveCredentials {
  id: string;
}

interface CreateUserContextDTO {
  user: ICreateUsersDTO;
  createUser(credentials: ICreateUsersDTO): Promise<void>;
  removeUser(credentials: RemoveCredentials): Promise<void>;
}

const CreateUserContext = createContext<CreateUserContextDTO>(
  {} as CreateUserContextDTO,
);

export const CreateUserProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ICreateUsersDTO>({} as ICreateUsersDTO);

  const { push } = useHistory();

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
        cep: credentials.endereco.cep,
        rua: credentials.endereco.rua,
        numero: credentials.endereco.numero,
        bairro: credentials.endereco.bairro,
        cidade: credentials.endereco.cidade,
      },
    };

    const res = await api.post(
      '/peoples',

      form,
    );

    setData(res.data);
  }, []);

  const removeUser = useCallback(async ({ id }: RemoveCredentials) => {
    const response = await api.delete(`/peoples/${id}`);

    console.log('no remove', id);
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
