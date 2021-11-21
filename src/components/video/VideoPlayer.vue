<script setup lang='ts'>
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{ url: string, poster?: string, autoplay?: boolean }>(), { autoplay: false });

const videoEl = ref<HTMLVideoElement | null>(null);

watch(() => props.url, (newVal) => {
  (videoEl.value as HTMLVideoElement).src = newVal;
});

</script>

<template lang='pug'>
.video-player
  video(
    ref="videoEl"
    controls
    :poster="props.poster"
    :autoplay="props.autoplay"
  )
    source(:src="props.url")
</template>

<style lang='scss' scoped>
.video-player {
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
}
</style>