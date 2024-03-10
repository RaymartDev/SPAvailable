import UserState from './UserState';

export default interface DropdownProps {
  setLoading: (e: boolean) => void;
  user: UserState;
}
