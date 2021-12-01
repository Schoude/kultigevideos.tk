import { defineStore } from 'pinia';
import { apiClient } from '../api';
import type { Comment } from '../types/models/comment';

interface CommentsState {
  count: number;
  comments: Comment[];
}

export const useCommentStore = defineStore('comments-store', {
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

        this.setCommentCount(res.data.totalCount.value);
        this.setVideoComments(res.data.comments);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setCommentCount(count: number) {
      this.count = count;
    },
    setVideoComments(comments: Comment[]) {
      this.comments = comments;
    },
    resetCommentData() {
      this.count = 0;
      this.comments = [];
    },
    async likeComment(commentId: string, userId: string) {
      try {
        const res = await apiClient.put({
          url: '/api/v1/comment/like',
          mode: 'cors',
          body: JSON.stringify({ commentId, userId }),
        });

        this.likeCommentLocal(commentId, userId);

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    likeCommentLocal(commentId: string, userId: string) {
      const modifiedComment = this.getCommentById(commentId);
      if (modifiedComment?.likes.includes(userId)) {
        const deleteFrom = modifiedComment.likes.indexOf(userId);
        modifiedComment?.likes.splice(deleteFrom, 1);
      } else {
        modifiedComment?.likes.push(userId);
      }

      if (modifiedComment?.dislikes.includes(userId)) {
        const deleteFrom = modifiedComment.dislikes.indexOf(userId);
        modifiedComment?.dislikes.splice(deleteFrom, 1);
      }
    },
    async dislikeComment(commentId: string, userId: string) {
      try {
        const res = await apiClient.put({
          url: '/api/v1/comment/dislike',
          mode: 'cors',
          body: JSON.stringify({ commentId, userId }),
        });

        this.dislikeCommentLocal(commentId, userId);

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    dislikeCommentLocal(commentId: string, userId: string) {
      const modifiedComment = this.getCommentById(commentId);
      if (modifiedComment?.dislikes.includes(userId)) {
        const deleteFrom = modifiedComment.dislikes.indexOf(userId);
        modifiedComment?.dislikes.splice(deleteFrom, 1);
      } else {
        modifiedComment?.dislikes.push(userId);
      }

      if (modifiedComment?.likes.includes(userId)) {
        const deleteFrom = modifiedComment.likes.indexOf(userId);
        modifiedComment?.likes.splice(deleteFrom, 1);
      }
    },
  },
  getters: {
    getCommentsCount: state => {
      return state.count;
    },
    getComments: state => {
      return state.comments;
    },
    getCommentById: state => {
      return (id: string) => {
        return state.comments.find(comment => comment._id === id);
      };
    },
  },
});
