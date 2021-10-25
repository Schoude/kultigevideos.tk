<script setup lang='ts'>
import { ref } from 'vue';
import { ICON_SIZE } from './icon-data';
import SvgIcon from './SvgIcon.vue';
const iconColor = ref('rgb(48, 187, 78)')
</script>

<template lang='pug'>
.testing-svg-icon
  .row
    SvgIcon(data-cy="size-xs" :size="ICON_SIZE.xs")
    SvgIcon(data-cy="size-s" :size="ICON_SIZE.s")
    SvgIcon(data-cy="size-m" :size="ICON_SIZE.m")
    SvgIcon(data-cy="size-l" :size="ICON_SIZE.l")
    SvgIcon(data-cy="size-xl" :size="ICON_SIZE.xl")
  .row
    SvgIcon(data-cy="color-red" color="red")
    SvgIcon(data-cy="color-hex" color="#3c67d3")
    SvgIcon(data-cy="color-var" :color="iconColor")
  .row
    SvgIcon(data-cy="house-user" icon-name="house-user")
    SvgIcon(data-cy="laptop-code" icon-name="laptop-code")
    SvgIcon(data-cy="sparkles" icon-name="sparkles")
</template>

<style lang='scss' scoped>
.testing-svg-icon {
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: rgb(48, 187, 78);
}

.row {
  display: flex;
  gap: 1em;
}
</style>