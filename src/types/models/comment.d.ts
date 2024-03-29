import type { UserSlim } from './user';

export interface IComment {
  _id?: string;
  authorId?: string;
  author?: UserSlim;
  uploaderId?: string;
  uploader?: UserSlim;
  text: string;
  videoHash: string;
  parentId?: string;
  likes: string[];
  dislikes: string[];
  likedByUploader?: boolean;
  createdAt?: string;
  replies?: IComment[];
  replyCount?: number;
  edited: boolean;
}
