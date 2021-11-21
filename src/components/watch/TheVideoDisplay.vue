<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoPlayer from '../../components/video/VideoPlayer.vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';
import { onUnmounted } from 'vue';

const router = useRouter();
const videoStore = useVideoStore();

await videoStore.getByHash(router.currentRoute.value.params.hash as string)

onUnmounted(() => videoStore.setCurrentVideo(null));
</script>

<template lang='pug'>
section.the-video-display
  .video-col
    VideoPlayer.video-player(
      :url="videoStore.getCurrentVideoUrl"
      :poster="videoStore.currentVideo?.thumb"
      :autoplay="true"
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
  max-width: 1700px;

  @include mq("laptop") {
    flex-direction: row;
  }

  @include mq("wqhd") {
    max-width: 2000px;
  }

  @include mq("4k") {
    max-width: 2700px;
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

.video-player {
  width: 100%;
  margin: 0 auto;

  @include mq("t-l") {
    height: 500px;
  }

  @include mq("laptop") {
    height: 450px;
  }

  @include mq("laptop-large") {
    height: 500px;
  }

  @include mq("desktop") {
    height: 720px;
  }

  @include mq("wqhd") {
    height: 1000px;
  }

  @include mq("4k") {
    height: 1350px;
  }
}
</style>