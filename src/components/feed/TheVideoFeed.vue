<script setup lang='ts'>
import { onMounted } from 'vue';
import { useVideoStore } from '../../stores/video';
import VideoFeedEntry from './VideoFeedEntry.vue';

const videoStore = useVideoStore();

onMounted(async () => await videoStore.getFeed())
</script>

<template lang='pug'>
section.the-video-feed
  template(v-for="video of videoStore.videos" :key="video.hash")
    VideoFeedEntry(:video='video')
</template>

<style lang='scss' scoped>
.the-video-feed {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
}
</style>