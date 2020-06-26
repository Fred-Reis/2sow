import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';
import { CreateUserProvider } from './hooks/CreateUserContext';

import SignUp from '../src/pages/SignUp';
// import Login from '../src/pages/Login';

// import Routes from './routes';

const App: React.FC = () => (
  <>
    <CreateUserProvider>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </CreateUserProvider>
    <GlobalStyle />
  </>
);

export default App;
