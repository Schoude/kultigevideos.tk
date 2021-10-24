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

  &.visible {
    opacity: 1;
    @include loader-indeterminate;
  }
}
</style>