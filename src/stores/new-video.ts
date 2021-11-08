import { defineStore } from 'pinia';

interface NewVideoState {
  newVideoFile: File | null;
  newVideoTitle: string;
}

export const useNewVideoStore = defineStore('new-video', {
  state: (): NewVideoState => ({
    newVideoFile: null,
    newVideoTitle: '',
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
  },
  getters: {
    videoFileLoaded(): boolean {
      return this.newVideoFile != null;
    },
  },
});
