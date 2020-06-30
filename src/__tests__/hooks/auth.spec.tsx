import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from 'src/hooks/auth';
import MockAdapter from 'axios-mock-adapter';
import api from 'src/services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

const apiResponse = {
  id: '123',
  nome: 'teste',
  email: 'teste@example.com',
  password: '1234',
  token: 'token-123',
};

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('src/hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Auth hook', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to sign in', async () => {
    apiMock.onGet('/peoples').reply(200, [apiResponse]);

    const setLocalStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({ email: 'teste@example.com', password: '1234' });

    await waitForNextUpdate();

    expect(setLocalStorageSpy).toHaveBeenCalledWith(
      '@NewWorld:token',
      apiResponse.token,
    );
    expect(setLocalStorageSpy).toHaveBeenCalledWith(
      '@NewWorld:user',
      JSON.stringify(apiResponse),
    );
    expect(result.current.user.email).toEqual('teste@example.com');
  });

  it('should be able restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@NewWorld:token':
          return apiResponse.token;
        case '@NewWorld:user':
          return JSON.stringify(apiResponse);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('teste@example.com');
  });

  // it('should not be able find an user registered with e-mail used', async () => {
  //   apiMock.onGet('/peoples').reply(200, [apiResponse]);

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  //   const data = {
  //     email: 'otherE-mail@teste.com',
  //     password: '1234',
  //   };

  //   act(() => {
  //     result.current.signIn(data);
  //   });

  //   expect(result.current.user).toBeUndefined;
  // });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@NewWorld:token':
          return apiResponse.token;
        case '@NewWorld:user':
          return JSON.stringify(apiResponse);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined;
  });
});
