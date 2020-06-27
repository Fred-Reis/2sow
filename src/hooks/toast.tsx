import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import IToastMessageDTO from 'src/dtos/IToastMessageDTO';

import ToastContainer from 'src/components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<IToastMessageDTO, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessageDTO[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<IToastMessageDTO, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used withim a ToastProvider');
  }

  return context;
}
