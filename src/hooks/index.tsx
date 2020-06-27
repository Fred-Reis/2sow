import React from 'react';

import { AuthProvider } from './auth';
import { CreateUserProvider } from './createUser';
import { UpdateUserProvider } from './updateUser';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <CreateUserProvider>
    <ToastProvider>
      <AuthProvider>
        <UpdateUserProvider>{children}</UpdateUserProvider>
      </AuthProvider>
    </ToastProvider>
  </CreateUserProvider>
);

export default AppProvider;
