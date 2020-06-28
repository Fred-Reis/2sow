import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';
import api from '../services/api';

interface UpdateUserState {
  newUser: object;
}

interface UpdateUserContextDTO {
  newUser: object;
  updateUser(credentials: ICreateUsersDTO): Promise<void>;
}

const UpdateUserContext = createContext<UpdateUserContextDTO>(
  {} as UpdateUserContextDTO,
);

export const UpdateUserProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UpdateUserState>({} as UpdateUserState);

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

    const res = await api.put(`/peoples/${credentials.id}`, form);

    setData(res.data);
  }, []);

  return (
    <UpdateUserContext.Provider value={{ newUser: data, updateUser }}>
      {children}
    </UpdateUserContext.Provider>
  );
};

export function useUpdate(): UpdateUserContextDTO {
  const context = useContext(UpdateUserContext);

  if (!context) {
    throw new Error('useUpdate must be used withim UpdateProvider');
  }
  return context;
}
