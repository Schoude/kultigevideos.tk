<script setup lang='ts'>
import TheVideoDisplay from '../../components/watch/TheVideoDisplay.vue';
</script>

<template lang='pug'>
main.watch
  Suspense
    template(#default)
      TheVideoDisplay
    template(#fallback)
      h1 Lade Video
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.watch {
  @include mq("t-l") {
    display: flex;
    justify-content: center;
  }

  padding-bottom: 4em;
}
</style>