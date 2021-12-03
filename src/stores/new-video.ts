import { useAuthStore } from './auth';
import { resolve } from 'cypress/types/bluebird';
import { defineStore } from 'pinia';
import { watch } from 'vue';
import { apiClient } from '../api';
import { useStorage } from '../firebase/use-storage';
import { NewVideoData } from '../types/models/video';

interface NewVideoState {
  newVideoFile: File | null;
  newVideoUrl: string | null;
  newVideoTitle: string;
  newVideoDescription: string;
  newVideoThumbnailFile: File | null;
  newVideoThumbnailUrl: string | null;
  newVideoHash: string | null;
  progressVideoUpload: number;
  newVideoDuration: number | null;
}

export const useNewVideoStore = defineStore('new-video', {
  state: (): NewVideoState => ({
    newVideoFile: null,
    newVideoUrl: null,
    newVideoTitle: '',
    newVideoDescription: '',
    newVideoThumbnailFile: null,
    newVideoThumbnailUrl: null,
    newVideoHash: '',
    progressVideoUpload: 0,
    newVideoDuration: null,
  }),
  actions: {
    setVideoFile(file: File | null) {
      this.newVideoFile = file;

      if (file == null) {
        this.newVideoTitle = '';
      } else {
        this.newVideoTitle = file?.name.split(/.mp4/g)[0] as string;
      }
    },
    setVideoThumbnailFile(file: File | null) {
      this.newVideoThumbnailFile = file;
    },
    setNewVideoHash(hash: string | null) {
      this.newVideoHash = hash;
    },
    setNewVideoDuration(duration: number | null) {
      this.newVideoDuration = duration;
    },
    async uploadNewVideoData(): Promise<void> {
      return new Promise(resolve => {
        const storage = useStorage();
        const { newDownloadURL: thumbnailUrl } = storage.uploadFileNewVideo(
          this.newVideoThumbnailFile as File,
          this.newVideoHash as string,
          'image/jpeg'
        );

        watch(thumbnailUrl, async url => {
          this.newVideoThumbnailUrl = url;
        });

        const { newDownloadURL: videoUrl, progress } =
          storage.uploadFileNewVideo(
            this.newVideoFile as File,
            this.newVideoHash as string,
            'video/mp4'
          );

        watch(videoUrl, async url => {
          this.newVideoUrl = url;
          resolve();
        });

        watch(progress, newVal => {
          this.progressVideoUpload = Math.floor(newVal);
        });
      });
    },
    async saveVideoDataToDB() {
      const authStore = useAuthStore();
      const newVideo: NewVideoData = {
        hash: this.newVideoHash as string,
        title: this.newVideoTitle,
        description: this.newVideoDescription,
        url: this.newVideoUrl as string,
        thumb: this.newVideoThumbnailUrl as string,
        listed: false,
        approved: false,
        uploaderId: authStore.getUserId,
        likes: [],
        dislikes: [],
        viewCount: 0,
        meta: {
          duration: this.newVideoDuration as number,
        },
      };

      try {
        const res = await apiClient.post<{ message: string }>({
          url: '/api/v1/video',
          body: JSON.stringify(newVideo),
          mode: 'cors',
        });

        return res;
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    resetNewVideoTextData() {
      this.newVideoTitle = '';
      this.newVideoDescription = '';
      this.newVideoThumbnailUrl = null;
      this.newVideoUrl = null;
    },
    resetUploadProgress() {
      this.progressVideoUpload = 0;
    },
    resetNewVideoDuration() {
      this.newVideoDuration = null;
    },
  },
  getters: {
    videoFileLoaded: state => {
      return state.newVideoFile != null;
    },
    getProgressVideoUpload: state => {
      return state.progressVideoUpload;
    },
  },
});
