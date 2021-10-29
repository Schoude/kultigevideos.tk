<script setup lang='ts'>
const props = defineProps<{ url: string, poster?: string }>()
</script>

<template lang='pug'>
.video-player
  video(controls :poster="props.poster")
    source(:src="props.url")
</template>

<style lang='scss' scoped>
.video-player {
  position: relative;
  padding-top: 56.25%;
}
video {
  width: inherit;
  position: absolute;
  inset: 0;
}
</style>