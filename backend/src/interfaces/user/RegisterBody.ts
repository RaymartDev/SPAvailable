export default interface RegisterBody {
  name: string;
  email: string;
  contact?: string;
  birthDate: string;
  password: string;
}