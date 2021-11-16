<script setup lang='ts'>
import { ref } from 'vue';
import { apiClient } from '../../api';
import type { VideoOverViewData } from '../../types/admin-panel';
import type { Video } from '../../types/models/video';
import OverviewVideoInteraction from './OverviewVideoInteraction.vue';

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
    OverviewVideoInteraction(
      v-for="video in notApprovedNotListed"
      :key="video._id"
      :video="video"
      type="approve"
      @reload:overiew="fetchVideoData"
    )

  .container.approved-not-listed
    h2.heading Nicht gelistete Videos ({{ approvedNotListed.length }})
    OverviewVideoInteraction(
      v-for="video in approvedNotListed"
      :key="video._id"
      :video="video"
      type="not-listed"
    )

  .container.approved-and-listed
    h2.heading Gelistete Videos ({{ approvedAndListed.length }})
    OverviewVideoInteraction(
      v-for="video in approvedAndListed"
      :key="video._id"
      :video="video"
      type="listed"
    )
</template>

<style lang='scss' scoped>
.videos-overview-display {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  column-gap: 2em;

  .heading {
    margin-bottom: 1em;
  }
}

.overview-video-interaction {
  & + & {
    margin-top: 1em;
  }
}
</style>