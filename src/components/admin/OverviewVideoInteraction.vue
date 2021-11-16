<script setup lang='ts'>
import { ref } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useVideoStore } from '../../stores/video';
import type { Uploader, Video } from '../../types/models/video';
import KvCheckbox from '../forms/elements/KvCheckbox.vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const videoStore = useVideoStore();
const authStore = useAuthStore();
const { getLocaleDateString } = usePageHelpers();

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

async function listVideoToggle(videoId: string, listVideo: boolean) {
  if (isLoading.value) return;

  isLoading.value = true
  await videoStore.listVideo({ videoId, listVideo });
  emits('reload:overiew');
  isLoading.value = false;
}

function getUsername(uploader: Uploader | undefined) {
  return authStore.getUserId === uploader?._id ? 'dir' : uploader?.username;
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

    section.uploader-data
      p.uploader Hochgeladen von&nbsp;
        RouterLink.user-link(:to="`/profile/${video.uploader?._id}`") {{ getUsername(video.uploader) }}
      p.uploaded-at am {{ getLocaleDateString(video.uploadedAt) }}

    section.approval-data(v-if="video.approved")
      hr
      p.approved-at Freigegeben am {{ getLocaleDateString(video.approvedAt) }}
      p.approved-by von&nbsp;
        RouterLink.user-link(:to="`/profile/${video.approvedBy?._id}`") {{ getUsername(video.approvedBy) }}

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
          @click="listVideoToggle(video._id, true)"
        ) Video listen

    .actions(v-if="type === 'listed'")
      .negavive
        button.btn.btn_cancel(
          type="button"
          :disabled="isLoading"
        ) Video löschen
      .positive
        button.btn.btn_cancel(
          type="button"
          :disabled="isLoading"
          @click="listVideoToggle(video._id, false)"
        ) Video nicht mehr listen
</template>

<style lang='scss' scoped>
@use '../../styles/scrollbar' as *;

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

.description,
.uploader {
  margin-top: 1em;
}

.user-link {
  display: inline;
  color: inherit;
  text-decoration: none;
  font-weight: 500;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}

.description {
  max-height: 120px;
  overflow: auto;

  @include scrollbar(thin);
}

.approval-data {
  hr {
    opacity: 0.5;
  }
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