import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import SignUp from '../src/pages/SignUp';
// import Login from '../src/pages/Login';

// import Routes from './routes';

const App: React.FC = () => (
  <>
    <SignUp />
    <GlobalStyle />
  </>
);

export default App;
