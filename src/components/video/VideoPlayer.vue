<script setup lang='ts'>
import { computed } from 'vue';

const props = withDefaults(defineProps<{ url: string, poster?: string, ratio: number }>(), { ratio: 9 / 16 })
const getRatio = computed(() => `${props.ratio * 100}%`)
</script>

<template lang='pug'>
.video-player(:style="{ paddingTop: getRatio }")
  video(controls :poster="props.poster")
    source(:src="props.url")
</template>

<style lang='scss' scoped>
.video-player {
  position: relative;
}
video {
  width: inherit;
  position: absolute;
  inset: 0;
}
</style>