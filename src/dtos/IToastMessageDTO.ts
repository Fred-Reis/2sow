export default interface IToastMessageDTO {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
