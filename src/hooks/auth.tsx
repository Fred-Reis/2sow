import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useToast } from './toast';
import api from '../services/api';

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
interface AuthState {
  id?: string;
  token?: string;
  avatar?: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  endereco: UserAddress;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextDTO {
  token: string;
  user: PeopleProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

export const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const { push } = useHistory();

  const [token, setToken] = useState(() => {
    const newToken = localStorage.getItem('@NewWorld:token');

    if (newToken) {
      return newToken;
    }

    return '';
  });

  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@NewWorld:user');

    if (user) {
      return JSON.parse(user);
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.get('/peoples');

      const users = response.data;

      const userExist = users.find((user: any) => user.email === email);

      if (!userExist) {
        throw new Error('Usuário não encontrado, verifique e tente novamente.');
      }

      if (userExist.password !== password) {
        throw new Error(
          'E-mail ou senha incorretos verifique e tente novamente.',
        );
      }

      if (userExist && userExist.password === password) {
        setToken(userExist.token);
        setData(userExist);

        localStorage.setItem('@NewWorld:user', JSON.stringify(userExist));
        localStorage.setItem('@NewWorld:token', userExist.token);

        addToast({
          type: 'success',
          title: 'Autenticação ok',
        });

        push('/dashboard');
      }
    },
    [addToast],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@NewWorld:token');
    localStorage.removeItem('@NewWorld:user');

    setData({} as AuthState);
    setToken('');
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDTO {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used withim AuthProvider');
  }
  return context;
}
