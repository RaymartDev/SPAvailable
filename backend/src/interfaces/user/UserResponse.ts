export default interface UserResponse {
  id: number;
  name: string;
  email: string;
  contact?: string | null;
  birth_date: Date;
  active: boolean;
  gender: boolean;
}