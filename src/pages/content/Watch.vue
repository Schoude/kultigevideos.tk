<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template lang='pug'>
main.watch {{ router.currentRoute.value.params.hash }}
</template>

<style lang='scss' scoped>
</style>