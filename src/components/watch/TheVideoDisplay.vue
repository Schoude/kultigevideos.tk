<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoPlayer from '../../components/video/VideoPlayer.vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';

const router = useRouter();
const videoStore = useVideoStore();

await videoStore.getByHash(router.currentRoute.value.params.hash as string)
</script>

<template lang='pug'>
section.the-video-display
  .video-col
    VideoPlayer(
      :url="videoStore.getCurrentVideoUrl"
      :poster="videoStore.currentVideo?.thumb"
    )
    .video-col__inner
      TheVideoMetadataDisplay
      TheVideoDescriptionDisplay
      .comments COMMENTS GO HERE
  .recommended-col
    .recommended-col__inner
      h1 Recommended go here
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.the-video-display {
  display: flex;
  gap: 1.25em;
  flex-direction: column;

  @include mq("laptop") {
    flex-direction: row;
  }
}

.video-col,
.recommended-col {
  flex: 1;
}

.video-col {
  flex-basis: 51.5%;
}

.video-col__inner,
.recommended-col__inner {
  margin: 0 0.5em;

  @include mq("t-p") {
    margin: 0 1em;
  }

  @include mq("laptop") {
    margin: revert;
  }
}
</style>