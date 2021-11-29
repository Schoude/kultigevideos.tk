import type { Video } from './video.d';
export type UserRole = 'admin' | 'maintainer' | 'user';

interface UserMetaData {
  avatarUrl: string;
}

export type User = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  meta: UserMetaData;
};

export type NewUserData = Omit<User, '_id' | 'meta'> & { password: string };

export type ProfileUser = Omit<User, 'email' | 'role'> & {
  videos: Video[];
  totalLikes: number;
  totalDislikes: number;
  totalVideoDuration: number;
  totalViewcount: number;
};

export type UserSlim = Omit<User, 'email' | 'role'>;
