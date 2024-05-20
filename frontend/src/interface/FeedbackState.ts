import Nullable from './Nullable';
import UserState from './UserState';

interface FeedbackStateRaw {
  id: number;
  desc: string;
  owner: UserState;
}

type FeedbackState = Nullable<Partial<FeedbackStateRaw>>;

export default FeedbackState;
