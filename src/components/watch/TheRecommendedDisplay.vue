<script setup lang='ts'>
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useVideoStore } from '../../stores/video';
import VideoRecommendedEntry from './VideoRecommendedEntry.vue';

const router = useRouter();
const videoStore = useVideoStore();

await videoStore.fetchRecommended(router.currentRoute.value.params.hash as string);

onBeforeRouteUpdate(async to => {
  await videoStore.fetchRecommended(to.params.hash as string);
})
</script>

<template lang='pug'>
aside.the-recommended-display
  VideoRecommendedEntry(
    v-for="video of videoStore.getVideosRecommended"
    :key="video.hash"
    :video="video"
  )
</template>

<style lang='scss' scoped>
</style>