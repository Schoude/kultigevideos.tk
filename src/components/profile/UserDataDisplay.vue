<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

const router = useRouter();
const userStore = useUserStore();

await userStore.fetchUserProfileData(router.currentRoute.value.params.id as string);
</script>

<template lang='pug'>
section.user-data-display
  | {{ userStore.getUserProfileData }}
</template>

<style lang='scss' scoped>
</style>