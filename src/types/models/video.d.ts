import type { UserMetaData, UserSlim } from './user.d';

interface VideoMetaData {
  duration: number;
}

export interface Video {
  _id: string;
  hash: string;
  url: string;
  title: string;
  description: string;
  thumb: string;
  viewCount: number;
  listed: boolean;
  approved?: boolean;
  approvedById?: string;
  approvedBy?: {
    _id: string;
    username: string;
    meta: UserMetaData;
  };
  approvedAt?: string;
  uploaderId: string;
  uploader?: UserSlim;
  uploadedAt: string;
  likes: string[];
  dislikes: string[];
  meta: VideoMetaData;
}

export type NewVideoData = Omit<Video, '_id' | 'uploadedAt'>;
