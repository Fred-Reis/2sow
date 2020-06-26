import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';

import { Container, CustomForm, FormSection, NewButton } from './styles';

import Input from '../../components/Input';
import apiCep from '../../services/apiCep';

import getValidationErrors from 'src/utils/getValidationErrors';
import cpfMask from 'src/utils/cpfMask';
import cepMask from 'src/utils/cepMask';

import logo from '../../assets/logo.svg';

interface EnderecoFormData {
  cep: number;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
}
interface SingnUpFormData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  token: string;
  endereco: EnderecoFormData;
}

const SignUp: React.FC = () => {
  const [maskedCpf, setMaskedCpf] = useState('');
  const [maskedCep, setMaskedCep] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();

  console.log('user', user);

  const handleSubmit = useCallback(
    async (data: SingnUpFormData): Promise<void> => {
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

        signIn({
          email: data.email,
          password: data.senha,
        });
      } catch (err) {
        console.log(err);
        formRef.current?.setErrors(getValidationErrors(err));
      }
    },
    [signIn],
  );

  const handleMaskCpf = useCallback((e: any): any => {
    setMaskedCpf(cpfMask(e.target.value));
  }, []);

  const handleMaskCep = useCallback(async (e: any): Promise<any> => {
    setMaskedCep(cepMask(e.target.value));

    let cep = e.target.value;

    const response = await apiCep.get(`${cep.replace('-', '')}/json/`);

    console.log('cep', response.data);
    formRef.current?.setFieldValue('cidade', response.data.localidade);
    formRef.current?.setFieldValue('rua', response.data.logradouro);
    formRef.current?.setFieldValue('bairro', response.data.bairro);

    // formRef.current?.setFieldRef('numero');
    // focus numero pendente
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
                  // onSubmit={handleGetAddress(maskedCep)}
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
