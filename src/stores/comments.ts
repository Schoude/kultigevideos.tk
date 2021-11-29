import { defineStore } from 'pinia';
import { apiClient } from '../api';
import type { Comment } from '../types/models/comment';

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
        const res = await apiClient.post({
          url: '/api/v1/comment',
          mode: 'cors',
          body: JSON.stringify(comment),
        });

        return res;
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
