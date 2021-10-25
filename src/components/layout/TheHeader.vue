<script setup lang='ts'>
</script>

<template lang='pug'>
header.the-header
</template>

<style lang='scss' scoped>
.the-header {
  position: sticky;
  top: 0;

  background-color: var(--color-header);
  height: var(--header-height);

  @media (prefers-color-scheme: light) {
    box-shadow: var(--shadow-weak);
  }
}
</style>