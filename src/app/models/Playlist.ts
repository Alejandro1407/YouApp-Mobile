import {Music} from './Music';
import {User} from './User';

export interface Playlist {
  id: number;
  title: string;
  user: User;
  songs: Music[];
  alreadyPlaylist: boolean;
}
