import type { User } from './user.d';

type Uploader = Pick<User, '_id' | 'username' | 'meta'>;

export interface Video {
  _id: string;
  hash: string;
  url: string;
  thumb: string;
  uploader: Uploader;
  viewCount: number;
  uploadedAt: Date;
}
