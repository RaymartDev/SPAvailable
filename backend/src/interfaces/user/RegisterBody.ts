/**
 * This is the Object that represents the body when registering
 */

export default interface RegisterBody {
  id: number;
  name: string;
  email: string;
  contact?: string;
  birth_date: string;
  password: string;
  gender: boolean;
  active?: boolean;
}