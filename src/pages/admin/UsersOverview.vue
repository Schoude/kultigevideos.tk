<script setup lang='ts'>
import UsersOverviewDisplay from '../../components/admin/UsersOverviewDisplay.vue';
</script>

<template lang='pug'>
main.users-overview
  Suspense
    template(#default)
      UsersOverviewDisplay
    template(#fallback)
      h1 Lade Daten
</template>

<style lang='scss' scoped>
</style>