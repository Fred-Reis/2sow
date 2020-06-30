import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { CreateUserProvider, useCreate } from 'src/hooks/createUser';
import MockAdapter from 'axios-mock-adapter';
import api from 'src/services/api';

const apiMock = new MockAdapter(api);

const form = {
  id: '1',
  nome: 'teste',
  cpf: '1234',
  email: 'teste@teste.com',
  senha: '1234',
  endereco: {
    cep: '12214212',
    rua: 'rua',
    numero: 111,
    bairro: 'bairro',
    cidade: 'cidade',
  },
};

const apiResponse = {
  nome: 'teste',
  cpf: '1234',
  email: 'teste@teste2.com',
  senha: '1234',
  token: 'token',
  endereco: {
    cep: '12214212',
    rua: 'rua',
    numero: 111,
    bairro: 'bairro',
    cidade: 'cidade',
  },
};

const setState = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStateMock: any = (initState: any) => [initState, setState];

describe('Create User hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to register new user', async () => {
    apiMock
      .onGet('/peoples')
      .reply(200, [apiResponse])
      .onPost('/peoples')
      .reply(200, form);

    const { result } = renderHook(() => useCreate(), {
      wrapper: CreateUserProvider,
    });

    await act(async () => result.current.createUser(form));

    expect(result.current.user).toEqual(form);
  });

  it('should be able to update user', async () => {
    apiMock.onPut('/peoples/1').reply(200, form);

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { result } = renderHook(() => useCreate(), {
      wrapper: CreateUserProvider,
    });

    await act(async () => result.current.updateUser(form));

    expect(setState).toHaveBeenCalled();
  });
});
