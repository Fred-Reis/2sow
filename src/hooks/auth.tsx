import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useToast } from './toast';
import api from '../services/api';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextDTO {
  token: string;
  user: ICreateUsersDTO;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

export const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();

  const history = useHistory();

  const [token, setToken] = useState(() => {
    const newToken = localStorage.getItem('@NewWorld:token');

    if (newToken) {
      return newToken;
    }

    return '';
  });

  const [data, setData] = useState<ICreateUsersDTO>(() => {
    const user = localStorage.getItem('@NewWorld:user');

    if (user) {
      return JSON.parse(user);
    }

    return {} as ICreateUsersDTO;
  });

  const signIn = useCallback(async ({ email, password }) => {
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
      localStorage.setItem('@NewWorld:user', JSON.stringify(userExist));
      localStorage.setItem('@NewWorld:token', userExist.token);

      setToken(userExist.token);
      setData(userExist);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@NewWorld:token');
    localStorage.removeItem('@NewWorld:user');

    setData({} as ICreateUsersDTO);
    setToken('');

    addToast({
      type: 'info',
      title: 'Sessão Encerrada',
    });
    history.push('/');
  }, [history, addToast]);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDTO {
  const context = useContext(AuthContext);

  return context;
}
