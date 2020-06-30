import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';

import faker from 'faker';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';
import api from '../services/api';

interface CreateUserContextDTO {
  user: ICreateUsersDTO;
  newUser: ICreateUsersDTO;
  updateUser(credentials: ICreateUsersDTO): Promise<void>;
  createUser(credentials: ICreateUsersDTO): Promise<void>;
}

const CreateUserContext = createContext<CreateUserContextDTO>(
  {} as CreateUserContextDTO,
);

export const CreateUserProvider: React.FC = ({ children }) => {
  const [newData, setNewData] = useState<ICreateUsersDTO>(
    {} as ICreateUsersDTO,
  );

  const [data, setData] = useState<ICreateUsersDTO>({} as ICreateUsersDTO);

  const createUser = useCallback(async (credentials: ICreateUsersDTO) => {
    const response = await api.get('/peoples');

    const users = response.data;

    const userAlreadyExist = users.find(
      (user: any) => user.email === credentials.email,
    );

    if (userAlreadyExist) {
      throw new Error('Já existe um cadastro com esse endereço de e-mail.');
    }

    const form = {
      nome: credentials.nome,
      cpf: credentials.cpf,
      avatar: faker.image.avatar(),
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

  const updateUser = useCallback(async (credentials: ICreateUsersDTO) => {
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

    const response = await api.put(`/peoples/${credentials.id}`, form);

    setData(response.data);
  }, []);

  return (
    <CreateUserContext.Provider
      value={{ user: data, createUser, updateUser, newUser: newData }}
    >
      {children}
    </CreateUserContext.Provider>
  );
};

export function useCreate(): CreateUserContextDTO {
  const context = useContext(CreateUserContext);

  return context;
}
