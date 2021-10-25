<script setup lang='ts'>
</script>

<template lang='pug'>
.loader
  .indicator
</template>

<style lang='scss' scoped>
@use '../../../styles/mixins' as *;

.loader {
  opacity: 0;
  transition: opacity 0.25s ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: inherit;
  height: 5px;
  overflow: hidden;
  background-color: rgb(77, 77, 77);

  @media (prefers-color-scheme: light) {
    background-color: rgb(168, 168, 168);
  }

  &.visible {
    opacity: 1;
    @include loader-indeterminate;
  }
}
</style>