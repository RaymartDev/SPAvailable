import Nullable from './Nullable';

interface UserStateRaw {
  id: number;
  name: string;
  gender: boolean;
  email: string;
  contact: string;
  birth_date: Date;
  active: boolean;
  created_at: string;
  profile: string;
}

type UserState = Nullable<Partial<UserStateRaw>>;

export default UserState;
