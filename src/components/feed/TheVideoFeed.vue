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
@use '../../styles/mixins' as *;

.the-video-feed {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-around;
}

.video-feed-entry {
  width: 420px;
  @include mq("t-p") {
    width: 320px;
  }

  @include mq("laptop") {
    width: 280px;
  }

  @include mq("desktop") {
    width: 420px;
  }
}
</style>