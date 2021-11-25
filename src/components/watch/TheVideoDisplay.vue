<script setup lang='ts'>
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoPlayer from '../../components/video/VideoPlayer.vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';
import {onUnmounted, ref, watch} from 'vue';
import TheRecommendedDisplay from './TheRecommendedDisplay.vue';
import { usePageHelpers } from '../../composables/page-helpers';

const router = useRouter();
const videoStore = useVideoStore();
const { setMediaSession } = usePageHelpers();
const letterbox = ref<boolean>(false);

watch(() => videoStore.currentVideo, (currentVideo) => {
  if (currentVideo) {
    setMediaSession(currentVideo.title, currentVideo.uploader?.username as string, currentVideo.thumb);
  }
});

onUnmounted(() => videoStore.setCurrentVideo(null));

onBeforeRouteUpdate(async to => {
  await videoStore.getByHash(to.params.hash as string);
})

function onAspectRatio (ratio: number) {
  if (ratio < 1.4) {
    letterbox.value = true;
  }
}

await videoStore.getByHash(router.currentRoute.value.params.hash as string)
</script>

<template lang='pug'>
section.the-video-display
  .video-col(:class="{'letterbox': letterbox}")
    VideoPlayer.video-player(
      :url="videoStore.getCurrentVideoUrl"
      :poster="videoStore.currentVideo?.thumb"
      :autoplay="true"
      @aspect-ratio="onAspectRatio"
    )
    .video-col__inner
      TheVideoMetadataDisplay
      TheVideoDescriptionDisplay
      .comments COMMENTS GO HERE
  TheRecommendedDisplay.recommended-col
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
    max-width: 2200px;
  }

  @include mq("4k") {
    max-width: 3000px;
  }
}

.video-col {
  flex: 1;
  max-width: 1780px;

  &.letterbox {
    max-width: 1280px;
  }
}

.recommended-col {
  width: 100%;
  max-width: 400px;
  flex: none;
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
