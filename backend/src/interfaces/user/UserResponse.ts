export default interface UserResponse {
  id: number;
  name: string;
  email: string;
  contact?: string | null;
  birthDate: Date;
  active: boolean;
}