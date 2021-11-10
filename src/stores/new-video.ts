import { defineStore } from 'pinia';

interface NewVideoState {
  newVideoFile: File | null;
  newVideoTitle: string;
  newVideoDescription: string;
  newVideoThumbnailFile: File | null;
  newVideoHash: string | null;
}

export const useNewVideoStore = defineStore('new-video', {
  state: (): NewVideoState => ({
    newVideoFile: null,
    newVideoTitle: '',
    newVideoDescription: '',
    newVideoThumbnailFile: null,
    newVideoHash: '',
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
  },
  getters: {
    videoFileLoaded(): boolean {
      return this.newVideoFile != null;
    },
  },
});
