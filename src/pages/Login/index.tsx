import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/logo.svg';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <h2>Embarque para um mundo novo</h2>

        <form>
          <h1>LOGIN</h1>

          <div>
            <p>EMAIL</p>
            <Input placeholder="Digite seu E-mail" />

            <p>SENHA</p>
            <Input type="password" placeholder="Digite sua senha" />

            <Button type="submit">ENTRAR</Button>

            <a href="signUp">
              Não tenho cadastro
              <FiLogIn />
            </a>
          </div>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
