<script setup lang='ts'>
import { onBeforeUnmount, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useImageHelpers } from '../../composables/image-helpers';
import { useNewVideoStore } from '../../stores/new-video';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const thumbEl1 = ref<HTMLImageElement | null>(null);
const thumbEl2 = ref<HTMLImageElement | null>(null);
const thumbEl3 = ref<HTMLImageElement | null>(null);

const generatingThumbnails = ref(true);

const newVideoStore = useNewVideoStore();
const { generateThumbNailsFromFile } = useImageHelpers();

watch(() => newVideoStore.newVideoFile, (file) => {
  if (file == null) return;

  const { finished } = generateThumbNailsFromFile(newVideoStore.newVideoFile as File,
    [(thumbEl1 as Ref<HTMLImageElement>),
    (thumbEl2 as Ref<HTMLImageElement>),
    (thumbEl3 as Ref<HTMLImageElement>)]
  );

  watch(finished, (finishedValue) => {
    if (finishedValue) {
      generatingThumbnails.value = false;
    }
  })
}, {
  immediate: true
});

onBeforeUnmount(() => {
  (thumbEl1.value as HTMLImageElement).src = '';
  (thumbEl2.value as HTMLImageElement).src = '';
  (thumbEl3.value as HTMLImageElement).src = '';
});

</script>

<template lang='pug'>
section.thumbnail-picker(
  :class="{ generating: generatingThumbnails }"
)
  section.generation-container(v-show="generatingThumbnails")
    LoaderIndeterminate.visible
    p.generation-message Vorschaubildergenerierung im Gange...

  section(v-show="!generatingThumbnails")
    h2.heading Wähle ein Vorschaubild
    .thumbnail-display
      img.thumb-img.thumb-1(ref="thumbEl1")
      img.thumb-img.thumb-2(ref="thumbEl2")
      img.thumb-img.thumb-3(ref="thumbEl3")
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
  min-height: 150px;
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

.heading {
  margin-bottom: 1em;
}

.thumbnail-display {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  justify-content: center;

  @include mq("t-p") {
    flex-direction: row;
    justify-content: space-around;
  }
}

.thumb-img {
  width: 120px;

  @include mq("t-p") {
    width: 200px;
  }
}
</style>