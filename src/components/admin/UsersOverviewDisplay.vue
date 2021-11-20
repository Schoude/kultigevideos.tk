<script setup lang='ts'>
import { onUnmounted } from 'vue';
import { useUserStore } from '../../stores/user';
import UserCard from './UserCard.vue';

const userStore = useUserStore();

await userStore.fetchUsersOverview();

onUnmounted(() => userStore.setUsersOverviewData([]))
</script>

<template lang='pug'>
section.users-overview-display
  h1 Benutzerübersicht
  .users-container
    UserCard(
      v-for="user of userStore.getUsersOverview"
      :key="user._id"
      :user="user"
      @updated:user-role="userStore.fetchUsersOverview"
    )
</template>

<style lang='scss' scoped>
.users-container {
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2em;
}
</style>