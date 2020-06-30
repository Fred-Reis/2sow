import React from 'react';

import { CreateUserProvider } from './createUser';
import { ToastProvider } from './toast';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <CreateUserProvider>
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  </CreateUserProvider>
);

export default AppProvider;
