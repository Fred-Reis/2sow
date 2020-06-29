import React, { useState, useCallback, useRef } from 'react';

import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import { Container, CustomForm, FormSection, NewButton } from './styles';
import { useCreate } from 'src/hooks/createUser';
import { useToast } from 'src/hooks/toast';

import ICreateUsersDTO from 'src/dtos/ICreateUsersDTO';

import getValidationErrors from 'src/utils/getValidationErrors';
import Input from 'src/components/Input';
import Header from 'src/components/Header';

import apiCep from 'src/services/apiCep';
import cepMask from 'src/utils/cepMask';
import cpfMask from 'src/utils/cpfMask';

import logo from 'src/assets/logo.svg';

const AddUser: React.FC = () => {
  const [maskedCpf, setMaskedCpf] = useState('');
  const [maskedCep, setMaskedCep] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { createUser } = useCreate();

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

        await createUser(data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: `Bem vindo á bordo ${data.nome}!`,
        });
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
    [createUser, addToast],
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
          <h2>Adicione alguém nessa viagem</h2>
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

          <NewButton type="submit">CADASTRAR</NewButton>
        </CustomForm>
      </Container>
    </>
  );
};

export default AddUser;
