import Nullable from './Nullable';
import UserState from './UserState';

interface SpaStateRaw {
  id: number;
  name: string;
  desc: string;
  cover_photo: string;
  display_photo: string;
  email: string;
  contact: string;
  address: string;
  owner: UserState;
  openTime: string;
  closeTime: string;
  created_at: Date;
  updated_at: Date;
}

type SpaState = Nullable<Partial<SpaStateRaw>>;

export default SpaState;
