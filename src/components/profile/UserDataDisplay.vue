<script setup lang='ts'>
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import UserDetails from './UserDetails.vue';
import UserVideos from './UserVideos.vue';

const router = useRouter();
const userStore = useUserStore();
const hasError = ref(false);

try {
  await userStore.fetchUserProfileData(router.currentRoute.value.params.id as string);
} catch (e) {
  hasError.value = true;
}

onUnmounted(() => userStore.setUserProfileData(null))
</script>

<template lang='pug'>
section.user-data-display(
  v-if="hasError === false"
)
  UserDetails
  UserVideos
section.user-error(v-else)
  h1 Nutzer nicht gefunden.
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

.user-error {
  text-align: center;
}
</style>