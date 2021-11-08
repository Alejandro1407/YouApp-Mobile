
import {Genre} from './Genre';
import {Status} from './Status';
import {User} from './User';

export interface Music {
  id: number;
  title: string;
  duration: number;
  uri: string;
  photo?: string;
  status: Status;
  genre: Genre;
  user: User;
  likes?: boolean;
}
