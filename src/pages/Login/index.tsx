import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';
import { useToast } from 'src/hooks/toast';
import { useAuth } from 'src/hooks/auth';

import getValidationErrors from 'src/utils/getValidationErrors';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

import logo from 'src/assets/logo.svg';

interface LoginFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData): Promise<void> => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um E-mail válido')
            .required('O E-mail é obrigatório'),
          senha: Yup.string().min(4, 'Mínimo 4 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.senha,
        });

        addToast({
          type: 'success',
          title: 'Autenticação ok',
          description: 'Seja bem-vindo à bordo!',
        });

        setTimeout(() => {
          history.push('/dashboard');
        }, 500);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no Login',
          description: err.message,
        });
      }
    },
    [signIn, addToast],
  );
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logo" />

        <h2>Embarque para um mundo novo</h2>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>LOGIN</h1>

          <div>
            <p>EMAIL</p>
            <Input name="email" placeholder="Digite seu E-mail" />

            <p>SENHA</p>
            <Input
              name="senha"
              type="password"
              placeholder="Digite sua senha"
            />

            <Button disabled={!!loading} loading={loading} type="submit">
              ENTRAR
            </Button>

            <Link to="/signUp">
              Não tenho cadastro
              <FiLogIn />
            </Link>
          </div>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
