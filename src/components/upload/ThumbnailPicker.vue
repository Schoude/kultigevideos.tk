<script setup lang='ts'>
import { onBeforeUnmount, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useImageHelpers } from '../../composables/image-helpers';
import { useNewVideoStore } from '../../stores/new-video';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';
import { convertToJpegImage } from '../../utils';

const thumbEl1 = ref<HTMLImageElement | null>(null);
const thumbEl2 = ref<HTMLImageElement | null>(null);
const thumbEl3 = ref<HTMLImageElement | null>(null);
const thumbEl4 = ref<HTMLImageElement | null>(null);

const generatingThumbnails = ref(true);
const selectedThumbnailSrc = ref('');

const newVideoStore = useNewVideoStore();
const { generateThumbNailsFromFile } = useImageHelpers();

watch(() => newVideoStore.newVideoFile, (file) => {
  if (file == null) return;

  const { finished, duration } = generateThumbNailsFromFile(newVideoStore.newVideoFile as File,
    [(thumbEl1 as Ref<HTMLImageElement>),
    (thumbEl2 as Ref<HTMLImageElement>),
    (thumbEl3 as Ref<HTMLImageElement>),
    (thumbEl4 as Ref<HTMLImageElement>)]
  );

  watch(finished, finishedValue => {
    if (finishedValue) {
      selectedThumbnailSrc.value = thumbEl1.value?.src as string;
      newVideoStore.setVideoThumbnailFile(convertToJpegImage(selectedThumbnailSrc.value, 'default.jpeg'))
      generatingThumbnails.value = false;
    }
  })

  watch(duration, durationValue => {
    newVideoStore.setNewVideoDuration(durationValue);
  });
}, {
  immediate: true
});

function onThumbnailSelect($event: Event) {
  if (($event.target as HTMLImageElement).src) {
    selectedThumbnailSrc.value = ($event.target as HTMLImageElement).src
  } else {
    selectedThumbnailSrc.value =
      (($event.target as HTMLButtonElement).firstChild as HTMLImageElement).src
  }
  newVideoStore.setVideoThumbnailFile(convertToJpegImage(selectedThumbnailSrc.value, 'default.jpeg'))
}

onBeforeUnmount(() => {
  (thumbEl1.value as HTMLImageElement).src = '';
  (thumbEl2.value as HTMLImageElement).src = '';
  (thumbEl3.value as HTMLImageElement).src = '';
  newVideoStore.setVideoThumbnailFile(null)
});

</script>

<template lang='pug'>
section.thumbnail-picker(
  :class="{ generating: generatingThumbnails }"
)
  section.generation-container(v-show="generatingThumbnails")
    LoaderIndeterminate.visible(data-cy="loader-thumbs")
    p.generation-message Vorschaubildergenerierung im Gange...

  section(v-show="!generatingThumbnails")
    h2.heading(data-cy="heading-preview-img") Wähle ein Vorschaubild
    .thumbnail-display
      button.btn_thumb-img(
        type="button"
        :title="thumbEl1?.src === selectedThumbnailSrc ? 'Das ist dein ausgewähltes Vorschaubild' : 'Klicken, um als Vorschaubild auszuwählen.'"
        @click="onThumbnailSelect"
        :class="{ selected: thumbEl1?.src === selectedThumbnailSrc }"
      )
        img.thumb-img.thumb-1(ref="thumbEl1")

      button.btn_thumb-img(
        type="button"
        :title="thumbEl2?.src === selectedThumbnailSrc ? 'Das ist dein ausgewähltes Vorschaubild' : 'Klicken, um als Vorschaubild auszuwählen.'"
        @click="onThumbnailSelect"
        :class="{ selected: thumbEl2?.src === selectedThumbnailSrc }"
      )
        img.thumb-img.thumb-2(ref="thumbEl2")

      button.btn_thumb-img(
        type="button"
        :title="thumbEl3?.src === selectedThumbnailSrc ? 'Das ist dein ausgewähltes Vorschaubild' : 'Klicken, um als Vorschaubild auszuwählen.'"
        @click="onThumbnailSelect"
        :class="{ selected: thumbEl3?.src === selectedThumbnailSrc }"
      )
        img.thumb-img.thumb-3(ref="thumbEl3")

      button.btn_thumb-img(
        type="button"
        :title="thumbEl4?.src === selectedThumbnailSrc ? 'Das ist dein ausgewähltes Vorschaubild' : 'Klicken, um als Vorschaubild auszuwählen.'"
        @click="onThumbnailSelect"
        :class="{ selected: thumbEl4?.src === selectedThumbnailSrc }"
      )
        img.thumb-img.thumb-4(ref="thumbEl4")
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

.btn_thumb-img {
  padding: 0;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  filter: grayscale(70%);

  &.selected {
    opacity: 1;
    filter: none;
  }
}
</style>