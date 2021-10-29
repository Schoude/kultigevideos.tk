<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoPlayer from '../../components/video/VideoPlayer.vue';
import { onMounted } from 'vue';
import TheVideoMetadataDisplay from './TheVideoMetadataDisplay.vue';
import TheVideoDescriptionDisplay from './TheVideoDescriptionDisplay.vue';

const router = useRouter();
const videoStore = useVideoStore();

onMounted(async () => await videoStore.getByHash(router.currentRoute.value.params.hash as string));
</script>

<template lang='pug'>
section.the-video-display
  .video-col
    VideoPlayer(
      v-if="videoStore.currentVideo"
      :url="videoStore.getCurrentVideoUrl"
      :poster="videoStore.currentVideo.thumb"
    )
    TheVideoMetadataDisplay
    TheVideoDescriptionDisplay
    .commets COMMENTS GO HERE
  .recommended-col
    h1 Recommended go here
</template>

<style lang='scss' scoped>
.the-video-display {
  display: flex;
  gap: 1.25em;
}

.video-col,
.recommended-col {
  flex: 1;
}

.video-player {
  width: 1280px;
}
</style>