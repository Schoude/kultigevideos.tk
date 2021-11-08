<script setup lang='ts'>
import { ref } from 'vue';
import { useNewVideoStore } from '../../stores/new-video';
import VideoPlayer from '../video/VideoPlayer.vue';

const newVideoStore = useNewVideoStore();

const newVideoLabel = ref<HTMLLabelElement | null>(null);
const videoInputEl = ref<HTMLInputElement | null>(null);

const previewUrl = ref('');

function onFileChange() {
  const file = videoInputEl.value?.files?.item(0);
  newVideoStore.setVideoFile(file as File);
  previewUrl.value = URL.createObjectURL(file);
}

function onVideoRemove() {
  newVideoStore.setVideoFile(null);
  previewUrl.value = '';
  (videoInputEl.value as HTMLInputElement).value = '';
}
</script>

<template lang='pug'>
section.video-file-picker
  button.btn.btn_primary(
    type="button"
    v-if="!newVideoStore.videoFileLoaded"
    data-cy="new-avatar-label"
    @click="() => newVideoLabel?.click()"
  ) Video auswählen
  label(for="new-video" ref="newVideoLabel")
  input#new-video(
    ref="videoInputEl"
    type="file"
    accept="video/mp4"
    name="new-video"
    data-cy="input-new-video"
    @change="onFileChange"
  )
  template(v-if="newVideoStore.videoFileLoaded")
    section.video-meta-data
      .video-preview
        VideoPlayer(:url="previewUrl")
        button.btn.btn_secondary(
          type="button"
          @click="onVideoRemove"
        ) Video entfernen
      .thumbnails thumbnails
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

#new-video {
  display: none;
}

.video-preview {
  width: 100%;

  @include mq("t-p") {
    width: 500px;
    margin: 0 auto;
  }
}
</style>