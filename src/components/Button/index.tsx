import React, { ButtonHTMLAttributes } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest}>
    {loading ? <BeatLoader size={10} color={'#fff'} /> : children}
  </Container>
);

export default Button;
