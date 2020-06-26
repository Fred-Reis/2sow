import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { Container, CustomForm, FormSection, NewButton } from './styles';

import InputMask from '../../components/InputMask';
import Input from '../../components/Input';

import getValidationErrors from 'src/utils/getValidationErrors';
import cpfMask from 'src/utils/cpfMask';
import cepMask from 'src/utils/cepMask';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const [maskedCpf, setMaskedCpf] = useState('');
  const [maskedCep, setMaskedCep] = useState('');
  const formRef = useRef<FormHandles>(null);

  const handleGetAddress = useCallback(async () => {
    formRef.current?.setFieldValue('rua', 'rua');
  }, []);

  const handleSubmit = useCallback(async (data: any): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório'),
        cpf: Yup.string().min(14, 'Precisa ter 12 números'),
        email: Yup.string()
          .email('Digite um E-mail válido')
          .required('O E-mail é obrigatório'),
        senha: Yup.string().min(4, 'Mínimo 4 dígitos'),
        cep: Yup.string().min(9, 'Precisa ter 8 números'),
        bairro: Yup.string().required('Bairro é obrigatório'),
        rua: Yup.string().required('Rua é obrigatória'),
        numero: Yup.string().required('Número é obrigatório'),
        cidade: Yup.string().required('Cidade é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
      formRef.current?.setErrors(getValidationErrors(err));
    }
  }, []);

  const handleMaskCpf = useCallback((e: any): any => {
    setMaskedCpf(cpfMask(e.target.value));
  }, []);

  const handleMaskCep = useCallback((e: any): any => {
    setMaskedCep(cepMask(e.target.value));
  }, []);

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <CustomForm ref={formRef} initialData={{}} onSubmit={handleSubmit}>
        <h2>Garanta seu lugar nessa viagem</h2>
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
        </div>

        <NewButton type="submit">ENTRAR</NewButton>

        <a href="signUp">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </CustomForm>
    </Container>
  );
};

export default SignUp;
