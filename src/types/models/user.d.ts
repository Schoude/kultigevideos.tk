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
