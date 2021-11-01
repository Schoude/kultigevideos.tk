import { useAuthStore } from './auth';
import { defineStore } from 'pinia';
import { apiClient } from '../api';
import { Video } from '../types/models/video';

interface VideoState {
  videos: Video[];
  currentVideo: null | Video;
}

export const useVideoStore = defineStore('video-store', {
  state: (): VideoState => ({ videos: [], currentVideo: null }),
  actions: {
    async getFeed() {
      try {
        const res = await apiClient.get<Video[]>({
          url: '/api/v1/videos/feed',
          mode: 'cors',
        });
        this.videos = res.data;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async getByHash(hash: string) {
      try {
        const res = await apiClient.get<Video>({
          url: `/api/v1/video/${hash}`,
          mode: 'cors',
        });
        this.currentVideo = res.data;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async likeVideo() {
      const authStore = useAuthStore();
      try {
        const res = await apiClient.put<Video>({
          url: '/api/v1/video/like',
          body: JSON.stringify({
            videoId: this.currentVideo?._id,
            userId: authStore.user?._id,
          }),
        });
        (this.currentVideo as Video).likes = res.data.likes;
        (this.currentVideo as Video).dislikes = res.data.dislikes;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async dislikeVideo() {
      const authStore = useAuthStore();
      try {
        const res = await apiClient.put<Video>({
          url: '/api/v1/video/dislike',
          body: JSON.stringify({
            videoId: this.currentVideo?._id,
            userId: authStore.user?._id,
          }),
        });
        (this.currentVideo as Video).likes = res.data.likes;
        (this.currentVideo as Video).dislikes = res.data.dislikes;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
  },
  getters: {
    getCurrentVideoUrl(): string {
      return this.currentVideo?.url as string;
    },
  },
});
