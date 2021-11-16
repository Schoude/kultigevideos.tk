<script setup lang='ts'>
import { ref } from 'vue';
import { useVideoStore } from '../../stores/video';
import type { Video } from '../../types/models/video';
import KvCheckbox from '../forms/elements/KvCheckbox.vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const videoStore = useVideoStore();

defineProps<{ video: Video, type: 'approve' | 'not-listed' | 'listed' }>();
const emits = defineEmits(['reload:overiew'])

const isLoading = ref(false);
const listVideo = ref(true);

async function onApproveClick(videoId: string) {
  if (isLoading.value) return;

  isLoading.value = true
  await videoStore.approveVideo({ videoId, listVideo: listVideo.value });
  emits('reload:overiew')
  isLoading.value = false;
}
</script>

<template lang='pug'>
article.overview-video-interaction
  LoaderIndeterminate(:class="{ visible: isLoading }")
  section.meta-data
    h3.title
      a(:href="video.url" target="_blank" rel="noopener")
        img.thumb(:src="video.thumb")
      a(:href="video.url" target="_blank" rel="noopener") {{ video.title }}
    p.description {{ video.description }}
    .actions(v-if="type === 'approve'")
      .negavive
        button.btn.btn_cancel(
          type="button"
          :disabled="isLoading"
        ) Video löschen
      .positive
        KvCheckbox(:name="video.hash" v-model:checked="listVideo") nach Freigabe listen?
        button.btn.btn_primary(
          type="button"
          :disabled="isLoading"
          @click="onApproveClick(video._id)"
        ) Video freigeben

    .actions(v-if="type === 'not-listed'")
      .negavive
        button.btn.btn_cancel(
          type="button"
          :disabled="isLoading"
        ) Video löschen
      .positive
        button.btn.btn_primary(
          type="button"
          :disabled="isLoading"
        ) Video listen

    .actions(v-if="type === 'listed'")
      .negavive
        button.btn.btn_cancel(
          type="button"
          :disabled="isLoading"
        ) Video löschen
      .positive
        button.btn.btn_primary(
          type="button"
          :disabled="isLoading"
        ) Video nicht mehr listen
</template>

<style lang='scss' scoped>
.overview-video-interaction {
  position: relative;
  gap: 1em;
  background-color: var(--color-ui);
}

.title {
  display: flex;
  align-items: center;
  gap: 1em;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.thumb {
  width: 120px;
  aspect-ratio: 16 / 9;
}

.meta-data {
  padding: 1em;
}

.description {
  margin-top: 1em;
  max-height: 120px;
  overflow: auto;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1em;

  .positive {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1em;
  }
}

a {
  display: block;
}
</style>