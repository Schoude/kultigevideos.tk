import { useAuthStore } from './auth';
import { defineStore } from 'pinia';
import { apiClient } from '../api';
import { Video } from '../types/models/video';
import { useStorage } from '../firebase/use-storage';

interface VideoState {
  videos: Video[];
  videosRecommended: Video[];
  currentVideo: null | Video;
}

export const useVideoStore = defineStore('video-store', {
  state: (): VideoState => ({
    videos: [],
    videosRecommended: [],
    currentVideo: null,
  }),
  actions: {
    async fetchFeed() {
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
    async fetchRecommended(excludeHash: string) {
      try {
        const res = await apiClient.get<Video[]>({
          url: `/api/v1/videos/recommended/${excludeHash}`,
          mode: 'cors',
        });

        this.setVideosRecommended(res.data);
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
      await storage.deleteVideoDataFromStorage(hash);

      try {
        await apiClient.delete<Video>({
          url: `/api/v1/video/${id}`,
        });
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    setCurrentVideo(video: Video | null) {
      this.currentVideo = video;
    },
    setVideosFeed(videos: Video[]) {
      this.videos = videos;
    },
    setVideosRecommended(videos: Video[]) {
      this.videosRecommended = videos;
    },
  },
  getters: {
    getCurrentVideoUrl: state => {
      return state.currentVideo?.url as string;
    },
    getCurrentVideoId: state => {
      return state.currentVideo?._id as string;
    },
    getCurrentVideoHash: state => {
      return state.currentVideo?.hash as string;
    },
    getCurrentVideoUploaderId: state => {
      return state.currentVideo?.uploader?._id as string;
    },
    getVideosFeed: state => {
      return state.videos;
    },
    getVideosRecommended: state => {
      return state.videosRecommended;
    },
  },
});
