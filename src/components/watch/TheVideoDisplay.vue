<script setup lang='ts'>
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoPlayer from '../../components/video/VideoPlayer.vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';
import { onUnmounted, watch } from 'vue';
import TheRecommendedDisplay from './TheRecommendedDisplay.vue';
import { usePageHelpers } from '../../composables/page-helpers';
import TheCommentsDisplay from '../comments/TheCommentsDisplay.vue';

const router = useRouter();
const videoStore = useVideoStore();
const { setMediaSession, setPageTitle } = usePageHelpers();

watch(() => videoStore.currentVideo, (currentVideo) => {
  if (currentVideo != null) {
    setPageTitle(currentVideo.title);
    setMediaSession(currentVideo.title, currentVideo.uploader?.username as string, currentVideo.thumb);
  }
});

onUnmounted(() => {
  videoStore.setCurrentVideo(null);
  setPageTitle();
});

onBeforeRouteUpdate(async to => {
  await videoStore.getByHash(to.params.hash as string);
})

await videoStore.getByHash(router.currentRoute.value.params.hash as string)
setPageTitle(videoStore.currentVideo?.title);
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
      TheCommentsDisplay.comments
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

.video-col,
.recommended-col {
  flex: 1;
}

.video-col {
  flex-basis: 33%;
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