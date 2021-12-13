<script setup lang='ts'>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = withDefaults(defineProps<{ url: string, poster?: string, autoplay?: boolean }>(), { autoplay: false });
const emit = defineEmits<{ (e: 'loadedmetadata', value: { width: number, height: number }): void }>();

const videoEl = ref<HTMLVideoElement | null>(null);

watch(() => props.url, (newVal) => {
  (videoEl.value as HTMLVideoElement).src = newVal;
});

async function setVideoCurrentTime() {
  const videoElement = videoEl.value as HTMLVideoElement;

  emit('loadedmetadata', {
    width: videoElement.videoWidth,
    height: videoElement.videoHeight
  });

  const time = router.currentRoute.value.query.t as unknown as number;
  const maxDuration = Math.floor(videoElement.duration);

  if (time && time <= maxDuration) {
    await nextTick(() => videoElement.currentTime = Number(router.currentRoute.value.query.t));
  }
}

onMounted(() => (videoEl.value as HTMLVideoElement).addEventListener('loadedmetadata', setVideoCurrentTime));
onBeforeUnmount(() => (videoEl.value as HTMLVideoElement).removeEventListener('loadedmetadata', setVideoCurrentTime));
</script>

<template lang='pug'>
video.video-player(
  ref="videoEl"
  controls
  :poster="props.poster"
  :autoplay="props.autoplay"
)
  source(:src="props.url")
</template>

<style lang='scss' scoped>
</style>