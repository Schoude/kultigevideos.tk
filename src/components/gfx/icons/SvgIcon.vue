<script setup lang='ts'>
import { computed } from "vue";
import { icons, ICON_SIZE } from "./icon-data";
import type { Icon } from './icon-data'

const props = withDefaults(defineProps<{
  iconName?: string,
  color?: string,
  size?: ICON_SIZE
}>(), {
  iconName: 'comment-alt',
  color: '#fff',
  size: ICON_SIZE.s
})

const getCurrentIcon = computed(
  () => icons.find((icon) => icon.name === props.iconName) as Icon
);

const getSizeClass = computed(() => ({
  'icon-xs': props.size === ICON_SIZE.xs,
  'icon-s': props.size === ICON_SIZE.s,
  'icon-m': props.size === ICON_SIZE.m,
  'icon-l': props.size === ICON_SIZE.l,
  'icon-xl': props.size === ICON_SIZE.xl,
}));
</script>

<template lang='pug'>
svg.svg-icon(
  xmlns='http://www.w3.org/2000/svg',
  :viewBox='getCurrentIcon.viewBox'
  role='img',
  :fill='color',
  :class='getSizeClass'
)
  path(:d='getCurrentIcon.d')
</template>

<style lang='scss' scoped>
.icon-xs {
  height: 18px;
}
.icon-s {
  height: 20px;
}
.icon-m {
  height: 24px;
}
.icon-l {
  height: 28px;
}
.icon-xl {
  height: 32px;
}
</style>