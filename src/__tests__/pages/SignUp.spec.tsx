import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignUp from 'src/pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedCreateUser = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('src/hooks/createUser', () => {
  return {
    useCreate: () => ({
      createUser: mockedCreateUser,
    }),
  };
});

jest.mock('src/hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedCreateUser.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able register a user', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const nomeField = getByPlaceholderText('Digite seu nome');
    const cpfField = getByPlaceholderText('Digite seu CPF');
    const numeroField = getByPlaceholderText('número');
    const bairroField = getByPlaceholderText('Bairro');
    const cidadeField = getByPlaceholderText('Cidade');
    const cepField = getByPlaceholderText('CEP');
    const ruaField = getByPlaceholderText('Rua');

    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(cpfField, { target: { value: '12345678909999' } });
    fireEvent.change(bairroField, { target: { value: 'bairro' } });
    fireEvent.change(cidadeField, { target: { value: 'cidade' } });
    fireEvent.change(cepField, { target: { value: '111111111' } });
    fireEvent.change(nomeField, { target: { value: 'teste' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });
    fireEvent.change(numeroField, { target: { value: '123' } });
    fireEvent.change(ruaField, { target: { value: 'rua' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalled();
    });
  });

  it('should not be able register a user with invalid data', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const nomeField = getByPlaceholderText('Digite seu nome');
    const cpfField = getByPlaceholderText('Digite seu CPF');
    const numeroField = getByPlaceholderText('número');
    const bairroField = getByPlaceholderText('Bairro');
    const cidadeField = getByPlaceholderText('Cidade');
    const cepField = getByPlaceholderText('CEP');
    const ruaField = getByPlaceholderText('Rua');

    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'no-valid-e-mail' } });
    fireEvent.change(cpfField, { target: { value: '12345678909999' } });
    fireEvent.change(bairroField, { target: { value: 'bairro' } });
    fireEvent.change(cidadeField, { target: { value: 'cidade' } });
    fireEvent.change(cepField, { target: { value: '111111111' } });
    fireEvent.change(nomeField, { target: { value: 'teste' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });
    fireEvent.change(numeroField, { target: { value: '123' } });
    fireEvent.change(ruaField, { target: { value: 'rua' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedCreateUser).not.toHaveBeenCalled();
    });
  });

  it('should be able redirect to login after register a user', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const nomeField = getByPlaceholderText('Digite seu nome');
    const cpfField = getByPlaceholderText('Digite seu CPF');
    const numeroField = getByPlaceholderText('número');
    const bairroField = getByPlaceholderText('Bairro');
    const cidadeField = getByPlaceholderText('Cidade');
    const cepField = getByPlaceholderText('CEP');
    const ruaField = getByPlaceholderText('Rua');

    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(cpfField, { target: { value: '12345678909999' } });
    fireEvent.change(bairroField, { target: { value: 'bairro' } });
    fireEvent.change(cidadeField, { target: { value: 'cidade' } });
    fireEvent.change(cepField, { target: { value: '111111111' } });
    fireEvent.change(nomeField, { target: { value: 'teste' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });
    fireEvent.change(numeroField, { target: { value: '123' } });
    fireEvent.change(ruaField, { target: { value: 'rua' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should be able display Toast with error', async () => {
    mockedCreateUser.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const nomeField = getByPlaceholderText('Digite seu nome');
    const cpfField = getByPlaceholderText('Digite seu CPF');
    const numeroField = getByPlaceholderText('número');
    const bairroField = getByPlaceholderText('Bairro');
    const cidadeField = getByPlaceholderText('Cidade');
    const cepField = getByPlaceholderText('CEP');
    const ruaField = getByPlaceholderText('Rua');

    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(cpfField, { target: { value: '12345678909999' } });
    fireEvent.change(bairroField, { target: { value: 'bairro' } });
    fireEvent.change(cidadeField, { target: { value: 'cidade' } });
    fireEvent.change(cepField, { target: { value: '111111111' } });
    fireEvent.change(nomeField, { target: { value: 'teste' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });
    fireEvent.change(numeroField, { target: { value: '123' } });
    fireEvent.change(ruaField, { target: { value: 'rua' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalled();
    });
  });
});
