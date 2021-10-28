<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template lang='pug'>
main.profile-user {{ router.currentRoute.value.params.id }}
</template>

<style lang='scss' scoped>
</style>