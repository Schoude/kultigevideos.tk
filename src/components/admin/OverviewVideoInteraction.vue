<script setup lang='ts'>
import { ref } from 'vue';
import type { Video } from '../../types/models/video';
import KvCheckbox from '../forms/elements/KvCheckbox.vue';
defineProps<{ video: Video, type: 'approve' | 'not-listed' | 'listed' }>();

const listVideo = ref(true);
</script>

<template lang='pug'>
article.overview-video-interaction
  section.meta-data
    h3.title
      a(:href="video.url" target="_blank" rel="noopener")
        img.thumb(:src="video.thumb")
      a(:href="video.url" target="_blank" rel="noopener") {{ video.title }}
    p.description {{ video.description }}
    .actions(v-if="type === 'approve'")
      .negavive
        button.btn.btn_cancel(type="button") Video löschen
      .positive
        KvCheckbox(:name="video.hash" v-model:checked="listVideo") Video listen?
        button.btn.btn_primary(type="button") Video freigeben
</template>

<style lang='scss' scoped>
.overview-video-interaction {
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
    gap: 0.5em;
  }
}

a {
  display: block;
}
</style>