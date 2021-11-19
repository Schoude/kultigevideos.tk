<script setup lang='ts'>
import { useUserStore } from '../../stores/user';
import { useAuthStore } from '../../stores/auth';
import UserDetails from './UserDetails.vue';
import UserVideos from './UserVideos.vue';

const authStore = useAuthStore();
const userStore = useUserStore();

if (userStore.getUserProfileData == null) {
  await userStore.fetchUserProfileData(authStore.getUserId);
}
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