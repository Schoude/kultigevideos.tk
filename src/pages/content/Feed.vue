<script setup lang='ts'>
import TheVideoFeed from '../../components/feed/TheVideoFeed.vue';
</script>

<template lang='pug'>
main.feed
  Suspense
    template(#default)
      TheVideoFeed
    template(#fallback)
      h1 Lade Daten
</template>

<style lang='scss' scoped>
</style>