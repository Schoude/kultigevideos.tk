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
    async fetchCommentsOfVideo(hash: string) {
      interface CommetsOfVideoData {
        totalCount: {
          value: number;
        };
        comments: Comment[];
      }

      this.resetCommentData();

      try {
        const res = await apiClient.get<CommetsOfVideoData>({
          url: `/api/v1/comments/${hash}`,
          mode: 'cors',
        });

        this.setVideoCount(res.data.totalCount.value);
        this.setVideoComments(res.data.comments);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setVideoCount(count: number) {
      this.count = count;
    },
    setVideoComments(comments: Comment[]) {
      this.comments = comments;
    },
    resetCommentData() {
      this.count = 0;
      this.comments = [];
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
