import React from 'react';
import { useTransition } from 'react-spring';

import IToastMessageDTO from 'src/dtos/IToastMessageDTO';
import Toast from './Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: IToastMessageDTO[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { opacity: 0, right: '-120%' },
      enter: { opacity: 1, right: '0%' },
      leave: { opacity: 0, right: '-120%' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
