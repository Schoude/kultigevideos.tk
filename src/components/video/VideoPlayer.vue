<script setup lang='ts'>
const props = withDefaults(defineProps<{ url: string, poster?: string, autoplay?: boolean }>(), { autoplay: false });
</script>

<template lang='pug'>
.video-player
  video(controls :poster="props.poster" :autoplay="props.autoplay")
    source(:src="props.url")
</template>

<style lang='scss' scoped>
.video-player {
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
}
</style>