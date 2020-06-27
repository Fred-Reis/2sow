import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import SignUp from '../src/pages/SignUp';
// import Login from '../src/pages/Login';

// import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignUp />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
