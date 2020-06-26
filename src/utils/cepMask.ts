type Cep = { cep: number };

export default function cpfMask(cep: Cep): string {
  return String(cep)
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}
