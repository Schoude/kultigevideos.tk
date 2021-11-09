<script setup lang='ts'>
import { ref } from 'vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const generatingThumbnails = ref(true);
</script>

<template lang='pug'>
section.thumbnail-picker(
  :class="{ generating: generatingThumbnails }"
)
  template(v-if="generatingThumbnails")
    section.generation-container
      LoaderIndeterminate.visible
      p.generation-message Vorschaubildergenerierung im Gange...
  template(v-else)
    section.thumbnail-display
      img.thumb-1
      img.thumb-2
      img.thumb-3
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.thumbnail-picker {
  margin: 2em 0;
  padding: 2em 0;
  border-top: 1px solid var(--border-color-container);
  border-bottom: 1px solid var(--border-color-container);

  &.generating {
    padding: 0;
  }
}

.generation-container {
  position: relative;
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.generation-message {
  font-size: 16px;

  @include mq("p-l") {
    font-size: 20px;
  }
}
</style>