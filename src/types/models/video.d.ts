import type { User } from './user.d';

type Uploader = Pick<User, '_id' | 'username' | 'meta'>;

export interface Video {
  _id: string;
  hash: string;
  url: string;
  thumb: string;
  viewCount: number;
  listed: boolean;
  approved: boolean;
  approvedBy?: {
    _id: string;
    username: string;
  };
  uploader: Uploader;
  uploadedAt: Date;
}
