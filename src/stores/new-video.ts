import { defineStore } from 'pinia';

interface NewVideoState {
  newVideoFile: File | null;
  newVideoTitle: string;
  newVideoThumbnailFile: File | null;
}

export const useNewVideoStore = defineStore('new-video', {
  state: (): NewVideoState => ({
    newVideoFile: null,
    newVideoTitle: '',
    newVideoThumbnailFile: null,
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
  },
  getters: {
    videoFileLoaded(): boolean {
      return this.newVideoFile != null;
    },
  },
});
