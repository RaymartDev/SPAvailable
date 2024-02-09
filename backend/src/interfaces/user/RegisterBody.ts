export default interface RegisterBody {
  name: string;
  email: string;
  contact?: string;
  birth_date: string;
  password: string;
}