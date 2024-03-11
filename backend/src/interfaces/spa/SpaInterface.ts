interface SpaInterface {
  id: number;
  name?: string;
  desc?: string;
  email?: string | null;
  contact?: string | null;
  address?: string | null;
  ownerId?: number | null;
  display_photo?: string | null;
  cover_photo?: string | null;
  updated_at?: Date;
  created_at?: Date;
}

type SpaObject = SpaInterface | null;

export default SpaObject;