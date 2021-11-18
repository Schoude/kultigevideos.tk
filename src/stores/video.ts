import { useAuthStore } from './auth';
import { defineStore } from 'pinia';
import { apiClient } from '../api';
import { Video } from '../types/models/video';
import { useStorage } from '../firebase/use-storage';

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
    async approveVideo({
      videoId,
      listVideo,
    }: {
      videoId: string;
      listVideo: boolean;
    }) {
      const authStore = useAuthStore();
      try {
        await apiClient.put<Video>({
          url: '/api/v1/video/approve',
          body: JSON.stringify({
            videoId,
            listVideo,
            userId: authStore.user?._id,
          }),
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async listVideo({
      videoId,
      listVideo,
    }: {
      videoId: string;
      listVideo: boolean;
    }) {
      try {
        await apiClient.put<Video>({
          url: '/api/v1/video/listed',
          body: JSON.stringify({
            videoId,
            listVideo,
          }),
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async deleteVideo(id: string, hash: string) {
      const storage = useStorage();
      await storage.deleteVideoFromStorage(hash);

      try {
        await apiClient.delete<Video>({
          url: `/api/v1/video/${id}`,
        });
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
