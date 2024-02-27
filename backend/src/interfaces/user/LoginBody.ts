export default interface LoginBody {
  email: string;
  password?: string;
  verified?: boolean;
}