import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import { Container, CustomForm, FormSection, NewButton } from './styles';
import { useUpdate } from 'src/hooks/updateUser';
import { useToast } from 'src/hooks/toast';
import { useAuth } from 'src/hooks/auth';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';

import getValidationErrors from 'src/utils/getValidationErrors';
import Input from 'src/components/Input';
import Header from 'src/components/Header';

import apiCep from 'src/services/apiCep';
import cepMask from 'src/utils/cepMask';
import cpfMask from 'src/utils/cpfMask';

import logo from 'src/assets/logo.svg';

const Profile: React.FC = () => {
  const [maskedCpf, setMaskedCpf] = useState('');
  const [maskedCep, setMaskedCep] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { push } = useHistory();
  const { state } = useLocation();
  const { addToast } = useToast();
  const { updateUser } = useUpdate();

  useEffect(() => {
    formRef.current?.setFieldValue('nome', state.user.nome);
    formRef.current?.setFieldValue('cpf', state.user.cpf);
    formRef.current?.setFieldValue('email', state.user.email);
    formRef.current?.setFieldValue('senha', state.user.password);
    formRef.current?.setFieldValue('endereco.cep', state.user.endereco.cep);
    formRef.current?.setFieldValue('endereco.sexo', state.user.endereco.sexo);
    formRef.current?.setFieldValue('endereco.rua', state.user.endereco.rua);
    formRef.current?.setFieldValue(
      'endereco.bairro',
      state.user.endereco.bairro,
    );
    formRef.current?.setFieldValue(
      'endereco.numero',
      state.user.endereco.numero,
    );
    formRef.current?.setFieldValue(
      'endereco.cidade',
      state.user.endereco.cidade,
    );
  }, []);

  const handleSubmit = useCallback(
    async (data: ICreateUsersDTO): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),
          cpf: Yup.string().min(14, 'Precisa ter 12 números'),
          senha: Yup.string().min(4, 'Mínimo 4 dígitos'),
          email: Yup.string()
            .email('Digite um E-mail válido')
            .required('O E-mail é obrigatório'),
          endereco: Yup.object().shape({
            cep: Yup.string().min(9, 'Precisa ter 8 números'),
            bairro: Yup.string().required('Bairro é obrigatório'),
            rua: Yup.string().required('Rua é obrigatória'),
            numero: Yup.string().required('Número é obrigatório'),
            cidade: Yup.string().required('Cidade é obrigatória'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const newUser: ICreateUsersDTO = {
          id: state.user.id,
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          senha: data.senha,
          sexo: data.sexo,
          endereco: {
            cep: data.endereco.cep,
            rua: data.endereco.rua,
            bairro: data.endereco.bairro,
            numero: data.endereco.numero,
            cidade: data.endereco.cidade,
          },
        };

        await updateUser(newUser);

        if (state.id === 'user') {
          await signIn({ email: data.email, password: data.senha });
        }

        addToast({
          type: 'success',
          title: 'Cadastro atualizado',
          description: 'Seus dados foram atualizados com sucesso!',
        });

        push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: err.message,
        });
      }
    },
    [updateUser, addToast],
  );

  const handleMaskCpf = useCallback((e: any): any => {
    setMaskedCpf(cpfMask(e.target.value));
  }, []);

  const handleMaskCep = useCallback(async (e: any): Promise<any> => {
    setMaskedCep(cepMask(e.target.value));

    let cep = e.target.value;

    const response = await apiCep.get(`${cep.replace('-', '')}/json/`);

    formRef.current?.setFieldValue('endereco.cidade', response.data.localidade);
    formRef.current?.setFieldValue('endereco.rua', response.data.logradouro);
    formRef.current?.setFieldValue('endereco.bairro', response.data.bairro);

    if (response.data.logradouro) {
      setTimeout(() => {
        formRef.current?.getFieldRef('endereco.numero').focus();
      }, 500);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <img src={logo} alt="Logo" />

        <CustomForm ref={formRef} onSubmit={handleSubmit}>
          <h2>PERFIL</h2>
          <div>
            <FormSection>
              <label>NOME</label>
              <Input name="nome" placeholder="Digite seu nome" />

              <label>CPF</label>
              <Input
                name="cpf"
                value={maskedCpf}
                placeholder="Digite seu CPF"
                onChange={handleMaskCpf}
              />

              <label>EMAIL</label>
              <Input name="email" placeholder="Digite seu E-mail" />

              <label>SENHA</label>
              <Input
                name="senha"
                type="password"
                placeholder="Digite sua senha"
              />
            </FormSection>
            <Scope path="endereco">
              <FormSection>
                <div>
                  <div style={{ width: '70%' }}>
                    <label>CEP</label>
                    <Input
                      name="cep"
                      value={maskedCep}
                      onChange={handleMaskCep}
                      placeholder="CEP"
                    />
                  </div>

                  <div>
                    <label>SEXO</label>
                    <Input name="sexo" placeholder="Opcional" />
                  </div>
                </div>

                <label>RUA</label>
                <Input name="rua" placeholder="Rua" />

                <div>
                  <div>
                    <label>BAIRRO</label>
                    <Input name="bairro" placeholder="Bairro" />
                  </div>

                  <div style={{ width: '50%' }}>
                    <label>NÚMERO</label>
                    <Input name="numero" placeholder="número" />
                  </div>
                </div>

                <label>CIDADE</label>
                <Input name="cidade" placeholder="Cidade" />
              </FormSection>
            </Scope>
          </div>

          <NewButton type="submit">ATUALIZAR PERFIL</NewButton>
        </CustomForm>
      </Container>
    </>
  );
};

export default Profile;
