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
  padding: 1em 0 0 0;

  @include mq("t-l") {
    display: flex;
    justify-content: center;
  }

  @include mq("laptop") {
    padding: 1em 75px;
  }

  @include mq("desktop") {
    padding: 1em 100px;
  }
}
</style>