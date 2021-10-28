import { defineStore } from 'pinia';
import { apiClient } from '../api';
import { Video } from '../types/models/video';

interface VideoState {
  videos: [] | Video[];
}

export const useVideoStore = defineStore('video-store', {
  state: (): VideoState => ({ videos: [] }),
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
  },
});
