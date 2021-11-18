<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import UserDetails from './UserDetails.vue';
import UserVideos from './UserVideos.vue';

const router = useRouter();
const userStore = useUserStore();

await userStore.fetchUserProfileData(router.currentRoute.value.params.id as string);
</script>

<template lang='pug'>
section.user-data-display
  UserDetails
  UserVideos
</template>

<style lang='scss' scoped>
@use '../../styles/_mixins' as *;

.user-data-display {
  max-width: 1350px;
  margin: 0 auto;

  @include mq("4k") {
    max-width: 1600px;
  }
}
</style>