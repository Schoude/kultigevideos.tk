import { defineStore } from 'pinia';

interface NewVideoState {
  newVideoFile: File | null;
}

export const useNewVideoStore = defineStore('new-video', {
  state: (): NewVideoState => ({
    newVideoFile: null,
  }),
  actions: {
    setVideoFile(file: File | null) {
      this.newVideoFile = file;
    },
  },
  getters: {
    videoFileLoaded(): boolean {
      return this.newVideoFile != null;
    },
  },
});
