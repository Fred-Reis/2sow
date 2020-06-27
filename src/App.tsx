import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import ToastContainer from './components/ToastContainer';

import { AuthProvider } from './hooks/AuthContext';
import { CreateUserProvider } from './hooks/CreateUserContext';
import { UpdateUserProvider } from './hooks/UpdateUserContext';

import SignUp from '../src/pages/SignUp';
// import Login from '../src/pages/Login';

// import Routes from './routes';

const App: React.FC = () => (
  <>
    <CreateUserProvider>
      <AuthProvider>
        <UpdateUserProvider>
          <SignUp />
        </UpdateUserProvider>
      </AuthProvider>
    </CreateUserProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);

export default App;
