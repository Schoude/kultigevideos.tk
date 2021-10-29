<script setup lang='ts'>
import '../styles/main.scss';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore()
</script>

<template lang='pug'>
section.user-profile-details
  img.user-avatar(data-cy="user-avatar" :src="authStore.getAvatarUrl")
  .detail-infos
    .entry
      h2.headline Name
      p.detail-info(data-cy="username") {{ authStore.getUserName }}
    .entry
      h2.headline E-Mail-Adresse
      p.detail-info(data-cy="email") {{ authStore.user?.email }}
    .entry
      h2.headline Rolle
      p.detail-info(data-cy="role") {{ authStore.getUserRoleText }}
</template>

<style lang='scss' scoped>
@use '../styles/mixins' as *;

.user-avatar {
  width: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1em;
}

.detail-infos {
  display: flex;
  flex-direction: column;
  gap: 2em;

  @include mq("t-p") {
    flex-direction: row;
    gap: 10em;
  }
}

.detail-info {
  font-size: 1.125em;
}
</style>