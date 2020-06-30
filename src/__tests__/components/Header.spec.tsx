import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from 'src/components/Header';

const mockedHistoryPush = jest.fn();
const mockedSignOut = jest.fn();

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
      signOut: mockedSignOut,
    }),
  };
});

describe('Header component', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedSignOut.mockClear();
  });
  it('should be able to SignOut when click `Sair`', () => {
    const { getByText } = render(<Header />);

    const headersignOut = getByText('Sair');
    fireEvent.click(headersignOut);

    expect(mockedSignOut).toBeCalled();
  });
});
