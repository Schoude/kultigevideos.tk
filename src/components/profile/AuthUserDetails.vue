<script setup lang='ts'>
import { useUserStore } from '../../stores/user';
import { useAuthStore } from '../../stores/auth';
import UserDetails from './UserDetails.vue';
import UserVideos from './UserVideos.vue';
import { onUnmounted } from '@vue/runtime-core';

const authStore = useAuthStore();
const userStore = useUserStore();

await userStore.fetchUserProfileData(authStore.getUserId);

onUnmounted(() => userStore.setUserProfileData(null));
</script>

<template lang='pug'>
section.auth-user-details
  UserDetails
  UserVideos
</template>

<style lang='scss' scoped>
.auth-user-details {
  margin-top: 2em;
}
</style>