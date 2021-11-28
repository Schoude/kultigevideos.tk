import { defineStore } from 'pinia';
import { Author } from '../types/models/user';

interface Comment {
  _id: string;
  author: Author;
  text: string;
  videoId: string;
  parentId?: string;
}

interface CommentsState {
  count: number;
  comments: Comment[];
}

export const useComments = defineStore('comments-store', {
  state: (): CommentsState => ({
    count: 0,
    comments: [],
  }),
  getters: {
    getCommentsCount(): number {
      return this.count;
    },
    getComments(): Comment[] {
      return this.comments;
    },
  },
});
