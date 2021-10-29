<script setup lang='ts'>
const props = defineProps<{ url: string, poster?: string }>()
</script>

<template lang='pug'>
.video-player
  video(controls :poster="props.poster")
    source(:src="props.url")
</template>

<style lang='scss' scoped>
video {
  width: inherit;
}
</style>