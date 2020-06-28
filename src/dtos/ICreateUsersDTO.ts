interface UserAddress {
  cep: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
}

export default interface ICreateUsersDTO {
  id?: string;
  token?: string;
  avatar?: string;
  nome: string;
  cpf: string;
  sexo?: string;
  email: string;
  senha: string;
  endereco: UserAddress;
}
