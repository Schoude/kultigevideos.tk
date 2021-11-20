<script setup lang='ts'>
import { onUnmounted } from '@vue/runtime-core';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

await userStore.fetchUsersOverview();

onUnmounted(() => userStore.setUsersOverviewData([]))
</script>

<template lang='pug'>
section.users-overview-display
</template>

<style lang='scss' scoped>
</style>