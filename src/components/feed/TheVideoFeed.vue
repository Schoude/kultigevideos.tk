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
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  // TODO: add if at least 4 vids are available
  // justify-content: space-around;
}

.video-feed-entry {
  width: 420px;
}
</style>