<script setup lang='ts'>
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{ url: string, poster?: string, ratio?: number }>(), { ratio: 9 / 16 });
const getRatio = computed(() => `${props.ratio * 100}%`);
const intrinsicRatio = ref<null | string>(null);

function onPlay(event: Event) {
  if (intrinsicRatio.value != null) return;

  setTimeout(() => {
    const { height, width } = (event.target as HTMLVideoElement).getBoundingClientRect();
    const ratioInstrinsic = `${height / width * 100}%`;

    if (ratioInstrinsic !== getRatio.value) {
      intrinsicRatio.value = ratioInstrinsic;
    }
  }, 50)
}
</script>

<template lang='pug'>
.video-player(:style="{ paddingTop: intrinsicRatio ?? getRatio }")
  video(controls :poster="props.poster" @play="onPlay")
    source(:src="props.url")
</template>

<style lang='scss' scoped>
.video-player {
  position: relative;
}

video {
  width: 100%;
  position: absolute;
  inset: 0;
}
</style>