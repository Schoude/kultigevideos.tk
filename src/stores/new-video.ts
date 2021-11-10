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
  }),
  actions: {
    setVideoFile(file: File | null) {
      this.newVideoFile = file;

      if (file == null) {
        this.newVideoTitle = '';
      } else {
        this.newVideoTitle = file?.name.split('.')[0] as string;
      }
    },
    setVideoThumbnailFile(file: File | null) {
      this.newVideoThumbnailFile = file;
    },
    setNewVideoHash(hash: string | null) {
      this.newVideoHash = hash;
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
        listed: true,
        approved: true,
        uploaderId: authStore.getUserId,
        likes: [],
        dislikes: [],
        viewCount: 0,
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

      // {
      //   "hash": "M09QPjkbpaq",
      //   "url": "https://firebasestorage.googleapis.com/v0/b/kultige-videos.appspot.com/o/M09QPjkbpaq%2FRudi%20V%C3%B6ller%20Ausraster%20%20nach%20%20dem%20Islandspiel.mp4?alt=media&token=be78a2e9-d939-492a-8870-f112187bf6b7",
      //   "thumb": "https://firebasestorage.googleapis.com/v0/b/kultige-videos.appspot.com/o/M09QPjkbpaq%2Fhqdefault.webp?alt=media&token=1e7c7ac6-7163-48cf-a318-0d6ffb892f89",
      //   "title": "Rudi Völler Ausraster nach Spiel gegen Island 03.09.2003",
      //   "description": "Nach einem enttäuschenden 0:0 der deutschen Nationalelf in einem EM-Qualifikationsspiel auf Island gegen die 'Brasilianer des Nordatlantik' äußerte er in einem Live-Interview mit ARD-Moderator Waldemar Hartmann seinen Unmut, nachdem er zur schlechten Leistung seiner Mannschaft befragt wurde.",
      //   "viewCount": 0,
      //   "listed": false,
      //   "approved": false,
      //   "uploaderId": "6177176029676e6d4369bff7",
      //   "likes": [],
      //   "dislikes": [],
      // }
    },
  },
  getters: {
    videoFileLoaded(): boolean {
      return this.newVideoFile != null;
    },
    getProgressVideoUpload(): number {
      return this.progressVideoUpload;
    },
  },
});
