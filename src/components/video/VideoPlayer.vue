<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = withDefaults(defineProps<{ url: string, poster?: string, autoplay?: boolean }>(), { autoplay: false });

const videoEl = ref<HTMLVideoElement | null>(null);

watch(() => props.url, (newVal) => {
  (videoEl.value as HTMLVideoElement).src = newVal;
});

function setVideoCurrenTime() {
  const time = router.currentRoute.value.query.t as unknown as number;
  const maxDuration = Math.floor((videoEl.value as HTMLVideoElement).duration);

  if (time && time <= maxDuration) {
    (videoEl.value as HTMLVideoElement).currentTime = Number(router.currentRoute.value.query.t);
  }
}

onMounted(() => (videoEl.value as HTMLVideoElement).addEventListener('loadedmetadata', setVideoCurrenTime));
onBeforeUnmount(() => (videoEl.value as HTMLVideoElement).removeEventListener('loadedmetadata', setVideoCurrenTime));
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