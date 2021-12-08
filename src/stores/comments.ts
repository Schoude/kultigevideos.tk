import { useVideoStore } from './video';
import { useAuthStore } from './auth';
import { defineStore } from 'pinia';
import { apiClient } from '../api';
import type { IComment } from '../types/models/comment';

interface CommentsState {
  count: number;
  comments: IComment[];
  selectedSortingType: SortingType;
}

export type SortingType = 'newest' | 'most-liked' | 'most-disliked';

export const useCommentStore = defineStore('comments-store', {
  state: (): CommentsState => ({
    count: 0,
    comments: [],
    selectedSortingType: 'newest',
  }),
  actions: {
    async createComment(comment: IComment) {
      try {
        const res = await apiClient.post<{
          message: string;
          commentId: string;
          createdAt: string;
        }>({
          url: '/api/v1/comment',
          mode: 'cors',
          body: JSON.stringify(comment),
        });

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    createCommentLocal(newComment: IComment) {
      if (newComment.parentId) {
        const parentComment = this.comments.find(
          comment => comment._id === newComment.parentId
        ) as IComment;

        if (parentComment.replies?.length === 0) {
          parentComment.replies?.push(newComment);
        } else {
          parentComment.replies?.unshift(newComment);
        }

        parentComment.replyCount = (parentComment.replyCount as number) + 1;
      } else {
        this.comments.unshift(newComment);
        this.count = this.count + 1;
      }
    },
    async editComment(commentId: string, commentText: string) {
      try {
        const res = await apiClient.put({
          url: '/api/v1/comment',
          mode: 'cors',
          body: JSON.stringify({ commentId, commentText }),
        });

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    editCommentlocal({
      _id,
      parentId,
      commentText,
      isReply,
    }: {
      _id: string;
      parentId?: string;
      commentText: string;
      isReply: boolean;
    }) {
      if (isReply) {
        (this.getReplyByid(_id, parentId as string) as IComment).text =
          commentText;

        (this.getReplyByid(_id, parentId as string) as IComment).edited = true;
      } else {
        (this.getCommentById(_id) as IComment).text = commentText;
        (this.getCommentById(_id) as IComment).edited = true;
      }
    },
    fillNewCommentData(
      comment: IComment,
      newCommentId: string,
      createdAt: string
    ) {
      const authStore = useAuthStore();
      const videoStore = useVideoStore();
      delete comment.authorId;
      delete comment.uploaderId;

      comment._id = newCommentId;
      comment.createdAt = createdAt;
      comment.author = {
        _id: authStore.getUserId,
        username: authStore.getUserName,
        meta: authStore.getUserMetaData,
      };
      comment.uploader = videoStore.currentVideo?.uploader;
      comment.replyCount = 0;

      return comment;
    },
    async fetchCommentsOfVideo(hash: string) {
      interface CommetsOfVideoData {
        totalCount: {
          value: number;
        };
        comments: IComment[];
      }

      this.resetCommentData();

      try {
        const res = await apiClient.get<CommetsOfVideoData>({
          url: `/api/v1/comments/${hash}`,
          mode: 'cors',
        });

        if (res.status === 200) {
          this.setCommentCount(res.data.totalCount.value);
          this.setVideoComments(res.data.comments);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setCommentCount(count: number) {
      this.count = count;
    },
    setVideoComments(comments: IComment[]) {
      this.comments = comments;
    },
    resetCommentData() {
      this.count = 0;
      this.comments = [];
      this.selectedSortingType = 'newest';
    },
    async likeComment(commentId: string, userId: string, parentId?: string) {
      try {
        const res = await apiClient.put({
          url: '/api/v1/comment/like',
          mode: 'cors',
          body: JSON.stringify({ commentId, userId }),
        });

        if (parentId != null) {
          this.likeCommentLocal(commentId, userId, parentId);
        } else {
          this.likeCommentLocal(commentId, userId);
        }

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    likeCommentLocal(commentId: string, userId: string, parentId?: string) {
      if (parentId != null) {
        const modifiedComment = this.getReplyByid(commentId, parentId);

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
      } else {
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
      }
    },
    async dislikeComment(commentId: string, userId: string, parentId?: string) {
      try {
        const res = await apiClient.put({
          url: '/api/v1/comment/dislike',
          mode: 'cors',
          body: JSON.stringify({ commentId, userId }),
        });

        if (parentId != null) {
          this.dislikeCommentLocal(commentId, userId, parentId);
        } else {
          this.dislikeCommentLocal(commentId, userId);
        }

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    dislikeCommentLocal(commentId: string, userId: string, parentId?: string) {
      if (parentId != null) {
        const modifiedComment = this.getReplyByid(commentId, parentId);
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
      } else {
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
      }
    },
    async toggleHeartOfComment(comment: IComment, status: boolean) {
      try {
        const res = await apiClient.post({
          url: '/api/v1/comment/heart',
          mode: 'cors',
          body: JSON.stringify({ commentId: comment._id, status }),
        });

        if (res.status === 200) {
          this.toggleHeartOfCommentLocal(comment, status);
        }

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    toggleHeartOfCommentLocal(comment: IComment, status: boolean) {
      if (comment.parentId) {
        (
          this.getReplyByid(
            comment._id as string,
            comment.parentId as string
          ) as IComment
        ).likedByUploader = status;
      } else {
        (
          this.getCommentById(comment._id as string) as IComment
        ).likedByUploader = status;
      }
    },
    async deleteComment(commentId: string, userId: string, parentId?: string) {
      try {
        const res = await apiClient.delete({
          url: `/api/v1/comment/?commentId=${commentId}&userId=${userId}`,
        });

        if (res.status === 202) {
          if (parentId != null) {
            this.deleteCommentLocal(commentId, parentId);
          } else {
            this.deleteCommentLocal(commentId);
          }
        }

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    deleteCommentLocal(commentId: string, parentId?: string) {
      if (parentId == null) {
        const deleteFromIndex = this.comments.findIndex(
          comment => comment._id === commentId
        );

        this.comments.splice(deleteFromIndex, 1);
        this.count = this.count - 1;
      } else {
        const foundParent = this.comments.find(
          comment => comment._id === parentId
        ) as IComment;

        const deleteFromIndex = foundParent.replies?.findIndex(
          reply => reply._id === commentId
        );

        foundParent.replies?.splice(deleteFromIndex as number, 1);
        foundParent.replyCount = (foundParent.replyCount as number) - 1;
      }
    },
    setSelectedSortingType(sortingType: SortingType) {
      this.selectedSortingType = sortingType;
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
    getReplyByid: state => {
      return (id: string, parentId: string) => {
        return state.comments
          .find(comment => comment._id === parentId)
          ?.replies?.find(reply => reply._id === id);
      };
    },
    isSelectedSortingType: state => {
      return (sortingType: SortingType) => {
        return sortingType === state.selectedSortingType;
      };
    },
    getSortedComments: state => {
      let sortedComments = [...state.comments];

      switch (state.selectedSortingType) {
        case 'newest':
          return sortedComments;

        case 'most-liked':
          sortedComments = sortedComments.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          break;

        case 'most-disliked':
          sortedComments = sortedComments.sort(
            (a, b) => b.dislikes.length - a.dislikes.length
          );
          break;
      }

      return sortedComments;
    },
  },
});
