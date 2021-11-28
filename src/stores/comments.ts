import { defineStore } from 'pinia';
import { apiClient } from '../api';
import { Author } from '../types/models/user';

interface Comment {
  _id?: string;
  authorId: string;
  author?: Author;
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
  actions: {
    async createComment(comment: Comment) {
      try {
        await apiClient.post({
          url: '/api/v1/comment',
          mode: 'cors',
          body: JSON.stringify(comment),
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
  getters: {
    getCommentsCount(): number {
      return this.count;
    },
    getComments(): Comment[] {
      return this.comments;
    },
  },
});
