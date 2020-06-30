import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Login from 'src/pages/Login';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedSignin = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('src/hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignin,
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

describe('Login Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
    mockedSignin.mockClear();
  });

  it('should be able display Toast with login ok', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalled();
    });
  });

  it('should be able to login', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to login with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should be able display Toast with error', async () => {
    mockedSignin.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('Digite seu E-mail');
    const senhaField = getByPlaceholderText('Digite sua senha');
    const buttonElement = getByText('ENTRAR');

    fireEvent.change(emailField, { target: { value: 'teste@example.com' } });
    fireEvent.change(senhaField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalled();
    });
  });
});
