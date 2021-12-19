<script setup lang='ts'>
import { ref } from "vue";
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
const aspectRatio = ref('16/9');
const hasError = ref(false);

watch(() => videoStore.currentVideo, (currentVideo) => {
  if (currentVideo != null) {
    setPageTitle(currentVideo.title);
    setMediaSession(currentVideo.title, currentVideo.uploader?.username as string, currentVideo.thumb);
  }
});

onUnmounted(() => {
  videoStore.setCurrentVideo(null);
  setPageTitle();
  hasError.value = false;
});

onBeforeRouteUpdate(async to => {
  try {
    await videoStore.getByHash(to.params.hash as string);
    hasError.value = false;
  } catch (error) {
    aspectRatio.value = '16/9';
    hasError.value = true;
    setPageTitle('Video nicht verfügbar');
  }
})

function onLoadedMetadata(event: { width: number, height: number }) {
  aspectRatio.value = `${event.width}/${event.height}`;
}

try {
  await videoStore.getByHash(router.currentRoute.value.params.hash as string)
  setPageTitle(videoStore.currentVideo?.title);
  hasError.value = false;
} catch (error) {
  aspectRatio.value = '16/9';
  hasError.value = true;
  setPageTitle('Video nicht verfügbar');
}

</script>

<template lang='pug'>
section.the-video-display
  template(v-if="hasError === false")
    .video-col
      VideoPlayer.video-player(
        :url="videoStore.getCurrentVideoUrl"
        :poster="videoStore.currentVideo?.thumb"
        :autoplay="true"
        @loadedmetadata="onLoadedMetadata"
      )
      .video-col__inner
        TheVideoMetadataDisplay
        TheVideoDescriptionDisplay
        TheCommentsDisplay.comments

  template(v-else)
    section.video-error-display
      h1 Ah, ah, ah! You didn't say the magic word!
      img(
        src="/images/magic-word.gif"
        alt="Ah, ah, ah! You didn't say the magic word!"
      )

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

.recommended-col {
  max-width: 400px;
  width: 100%;
}

.video-player,
.video-error-display {
  width: 100%;
  aspect-ratio: v-bind(aspectRatio);
  background-color: #000;
  display: flex;
  flex-direction: column;

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

  h1 {
    color: black;
    margin-bottom: 1em;
    font-weight: 500;
    text-align: center;
  }
}

.video-error-display {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  h1 {
    font-size: 1.5em;
  }
}
</style>