import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Form, FormSection, NewButton } from './styles';

import Input from '../../components/Input';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="Logo" />

      <Form>
        <h2>Garanta seu lugar nessa viagem</h2>
        <div>
          <FormSection>
            <p>NOME</p>
            <Input placeholder="Digite seu nome" />

            <p>CPF</p>
            <Input placeholder="Digite seu CPF" />

            <p>EMAIL</p>
            <Input placeholder="Digite seu E-mail" />

            <p>SENHA</p>
            <Input type="password" placeholder="Digite sua senha" />
          </FormSection>

          <FormSection>
            <div>
              <figure style={{ width: '60%' }}>
                <p>CEP</p>
                <Input placeholder="CEP" />
              </figure>

              <figure>
                <p>SEXO</p>
                <Input placeholder="Opcional" />
              </figure>
            </div>

            <p>RUA</p>
            <Input placeholder="Rua" />

            <div>
              <figure>
                <p>BAIRRO</p>
                <Input placeholder="Bairro" />
              </figure>

              <figure style={{ width: '50%' }}>
                <p>NÚMERO</p>
                <Input placeholder="número" />
              </figure>
            </div>

            <p>CIDADE</p>
            <Input placeholder="Cidade" />
          </FormSection>
        </div>

        <NewButton style={{}} type="submit">
          ENTRAR
        </NewButton>

        <a href="signUp">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </Form>
    </Container>
  );
};

export default SignUp;
