<script setup lang='ts'>
import { onBeforeUnmount, ref } from 'vue';
import { useNewVideoStore } from '../../stores/new-video';
import { randomString } from '../../utils';
import VideoPlayer from '../video/VideoPlayer.vue';
import ThumbnailPicker from './ThumbnailPicker.vue';

const newVideoStore = useNewVideoStore();

const newVideoLabel = ref<HTMLLabelElement | null>(null);
const videoInputEl = ref<HTMLInputElement | null>(null);

const previewUrl = ref('');

function onFileChange() {
  const file = videoInputEl.value?.files?.item(0);
  newVideoStore.setVideoFile(file as File);
  previewUrl.value = URL.createObjectURL(file);
  newVideoStore.setNewVideoHash(randomString(11))
}

function onVideoRemove() {
  newVideoStore.setVideoFile(null);
  previewUrl.value = '';
  (videoInputEl.value as HTMLInputElement).value = '';
  newVideoStore.setNewVideoHash(null);
  newVideoStore.resetNewVideoDuration();
}

onBeforeUnmount(() => {
  onVideoRemove();
})
</script>

<template lang='pug'>
section.video-file-picker
  button.btn.btn_primary(
    type="button"
    v-if="!newVideoStore.videoFileLoaded"
    data-cy="btn-pick-video"
    @click="() => newVideoLabel?.click()"
  ) Video auswählen
  label(for="new-video" ref="newVideoLabel")
  input#new-video(
    ref="videoInputEl"
    type="file"
    accept="video/mp4,video/*"
    name="new-video"
    data-cy="input-new-video"
    @change="onFileChange"
  )
  template(v-if="newVideoStore.videoFileLoaded")
    section.video-meta-data
      .video-preview
        VideoPlayer(:url="previewUrl")
        button.btn.btn_cancel.btn_video-remove(
          type="button"
          @click="onVideoRemove"
        ) Video entfernen
      ThumbnailPicker
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.video-file-picker {
  padding-top: 1em;
}

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

.btn_video-remove {
  margin-top: 1em;
}
</style>