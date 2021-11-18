<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import UserDetails from './UserDetails.vue';

const router = useRouter();
const userStore = useUserStore();

await userStore.fetchUserProfileData(router.currentRoute.value.params.id as string);
</script>

<template lang='pug'>
section.user-data-display
  UserDetails
</template>

<style lang='scss' scoped>
.user-data-display {
  max-width: 1000px;
  margin: 0 auto;
}
</style>