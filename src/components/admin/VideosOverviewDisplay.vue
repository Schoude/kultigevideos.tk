<script setup lang='ts'>
import { ref } from 'vue';
import { apiClient } from '../../api';
import type { VideoOverViewData } from '../../types/admin-panel';
import type { Video } from '../../types/models/video';

const notApprovedNotListed = ref<Video[]>([]);
const approvedNotListed = ref<Video[]>([]);
const approvedAndListed = ref<Video[]>([]);

async function fetchVideoData() {
  try {
    const res = await apiClient.get<VideoOverViewData>({ url: '/api/v1/videos/panel', mode: 'cors' });
    notApprovedNotListed.value = res.data.videosNotApprovedNotListed;
    approvedNotListed.value = res.data.videosApprovedNotListed;
    approvedAndListed.value = res.data.videosApprovedAndListed;

  } catch (error) {
    console.log((error as Error).message);
  }
}

await fetchVideoData();
</script>

<template lang='pug'>
section.videos-overview-display
  .container.not-approved-not-listed
    h2.heading Videos zur Überprüfung ({{ notApprovedNotListed.length }})
    a(:href="video.url" target="_blank" rel="noopener" v-for="video in notApprovedNotListed")
      img.thumb(:src="video.thumb")
      span.title {{ video.title }}

  .container.approved-not-listed
    h2.heading Nicht gelistete Videos ({{ approvedNotListed.length }})
    a(:href="video.url" target="_blank" rel="noopener" v-for="video in approvedNotListed")
      img.thumb(:src="video.thumb")
      span.title {{ video.title }}

  .container.approved-and-listed
    h2.heading Gelistete Videos ({{ approvedAndListed.length }})
    a(:href="video.url" target="_blank" rel="noopener" v-for="video in approvedAndListed")
      img.thumb(:src="video.thumb")
      span.title {{ video.title }}
</template>

<style lang='scss' scoped>
.videos-overview-display {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));

  .heading {
    margin-bottom: 1em;
  }
}

a {
  display: flex;
  align-items: center;
  gap: 0.5em;
  text-decoration: none;
  color: inherit;

  & + & {
    margin-top: 1em;
  }
}

.thumb {
  width: 100px;
  aspect-ratio: 16 / 9;
}
</style>