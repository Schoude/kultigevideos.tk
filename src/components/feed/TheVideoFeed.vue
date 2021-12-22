<script setup lang='ts'>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useVideoStore } from '../../stores/video';
import VideoFeedEntry from './VideoFeedEntry.vue';

const videoStore = useVideoStore();
const root = ref<HTMLElement | null>();
const observer = ref<IntersectionObserver | null>();
const newAdded = ref(true);

await videoStore.fetchFeed();

onMounted(() => {
  const lastVideo = (root.value as HTMLElement).querySelector('.video-feed-entry:last-child') as Element;

  observer.value = new IntersectionObserver(async entries => {
    if (entries[0].isIntersecting) {
      observer.value?.unobserve(entries[0].target);

      const skipIds = videoStore.videos.map(video => video.hash);
      newAdded.value = await videoStore.reloadFeed(skipIds) as boolean;

      if (newAdded.value) {
        const lastVideo = (root.value as HTMLElement).querySelector('.video-feed-entry:last-child') as Element;
        observer.value?.observe(lastVideo);
      } else {
        observer.value?.unobserve(entries[0].target);
      }
    };
  }, {
    rootMargin: `${lastVideo.scrollHeight * 1.5}px`,
  });

  observer.value.observe(lastVideo);
});

onUnmounted(() => videoStore.setVideosFeed([]))
</script>

<template lang='pug'>
section.the-video-feed(ref="root")
  template(v-for="video of videoStore.getVideosFeed" :key="video.hash")
    VideoFeedEntry(:video='video')
template(v-if="newAdded === false")
  p.no-videos-disclaimer Keine weiteren Videos verfügbar...! 😮
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

.no-videos-disclaimer {
  text-align: center;
  margin-block: 2em;
  font-size: 1.75em;
}
</style>1