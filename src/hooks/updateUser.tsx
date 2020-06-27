import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UpdateUserState {
  newUser: object;
}

interface UpdateCredentials {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  token: string;
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
}

interface UpdateUserContextDTO {
  newUser: object;
  updateUser(credentials: UpdateCredentials): Promise<void>;
}

const UpdateUserContext = createContext<UpdateUserContextDTO>(
  {} as UpdateUserContextDTO,
);

export const UpdateUserProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UpdateUserState>({} as UpdateUserState);

  const updateUser = useCallback(async (credentials: UpdateCredentials) => {
    const form = {
      nome: credentials.nome,
      cpf: credentials.cpf,
      email: credentials.email,
      password: credentials.senha,
      token: credentials.token,
      endereco: {
        cep: credentials.cep,
        rua: credentials.rua,
        numero: credentials.numero,
        bairro: credentials.bairro,
        cidade: credentials.cidade,
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
