<script setup lang='ts'>
import VideoFilePicker from '../../components/upload/VideoFilePicker.vue';
import { useNewVideoStore } from '../../stores/new-video';

const newVideoStore = useNewVideoStore();
</script>

<template lang='pug'>
main.upload
  section.upload__inner
    VideoFilePicker
    template(v-if="newVideoStore.videoFileLoaded")
      section.video-text-data
        .form-field
          input(type="text" v-model.trim='newVideoStore.newVideoTitle')
        .description description
      .actions
        button.btn.btn_primary Video hochladen
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.upload__inner {
  @include mq("t-l") {
    margin: 0 25%;
  }
}
</style>