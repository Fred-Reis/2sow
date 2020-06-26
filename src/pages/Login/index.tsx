import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';

const Login: React.FC = () => {
  const handleSubmit = () => {};
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <h2>Embarque para um mundo novo</h2>

        <Form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>

          <div>
            <p>EMAIL</p>
            <Input name="email" placeholder="Digite seu E-mail" />

            <p>SENHA</p>
            <Input
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />

            <Button type="submit">ENTRAR</Button>

            <a href="signUp">
              Não tenho cadastro
              <FiLogIn />
            </a>
          </div>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
