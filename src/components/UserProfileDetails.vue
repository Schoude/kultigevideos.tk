<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routing-info';
import { useAuthStore } from '../stores/auth';
import UserAvatarEditor from './profile/UserAvatarEditor.vue';

const authStore = useAuthStore()
const router = useRouter();

async function goToAdminPanel() {
  await router.push({ name: ROUTE_NAMES.ADMIN_PANEL })
}
</script>

<template lang='pug'>
section.user-profile-details
  UserAvatarEditor
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
  template(v-if="authStore.userIsAdmin")
    hr
    button.btn.btn_secondary(
      data-cy="link-admin-panel"
      @click="goToAdminPanel"
    ) Zum Adminpanel
</template>

<style lang='scss' scoped>
@use '../styles/mixins' as *;

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

hr {
  opacity: 0.4;
}
</style>