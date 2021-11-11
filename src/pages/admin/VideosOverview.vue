<script setup lang='ts'>
import VideosOverviewDisplay from '../../components/admin/VideosOverviewDisplay.vue';
</script>

<template lang='pug'>
main.videos-overview
  Suspense
    template(#default)
      VideosOverviewDisplay
    template(#fallback)
      h1 Lade Daten...
</template>

<style lang='scss' scoped>
</style>