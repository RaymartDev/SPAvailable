export default interface DropdownProps {
  setLoading: (e: boolean) => void;
  user?: {
    id: number;
    name: string;
    gender: boolean;
    email: string;
    contact: string;
    birth_date: Date;
    active: boolean;
    created_at?: string;
    profile?: string;
  };
}
