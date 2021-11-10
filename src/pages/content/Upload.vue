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
        .field_container
          h2.heading Videotitel
          .form-field
            input(type="text" v-model.trim='newVideoStore.newVideoTitle')

        .field_container
          h2.heading Videobeschreibung
          .form-field
            textarea.description(
              v-model.trim='newVideoStore.newVideoDescription'
              maxlength="500"
            )

      .actions
        button.btn.btn_primary(
          :disabled="!newVideoStore.videoFileLoaded"
        ) Video hochladen
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.upload {
  padding-bottom: 6em;
}

.upload__inner {
  @include mq("t-l") {
    margin: 0 25%;
  }
}

.video-text-data {
  margin: 2em 0;
}

.field_container {
  &:not(:first-child) {
    margin-top: 2em;
  }

  .heading {
    margin-bottom: 0.5em;
  }
}

.description {
  width: 100%;
}
</style>