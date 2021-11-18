<script setup lang='ts'>
import UserDataDisplay from '../../components/profile/UserDataDisplay.vue';
</script>

<template lang='pug'>
main.profile-user
  Suspense
    template(#default)
      UserDataDisplay
    template(#fallback)
      h1 Lade Daten
</template>

<style lang='scss' scoped>
</style>