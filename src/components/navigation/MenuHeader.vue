<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../../router/routing-info';
import { useAuthStore } from '../../stores/auth';
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const authStore = useAuthStore();
const router = useRouter();

async function onLogoutClick() {
  await authStore.logout()
  await router.push({ name: ROUTE_NAMES.LOGIN });
  authStore.user = null;
}
</script>

<template lang='pug'>
nav.menu-header
  RouterLink.link.link-profile(
    v-if="authStore.user?.role !== 'user'"
    to='/upload'
    title="Ein neues Video hochladen"
    data-cy="link-upload"
  )
    SvgIcon(icon-name="upload" :size="ICON_SIZE.m")
  span.username(data-cy="username") {{ authStore.getUserName }}
  RouterLink.link(to='/profile' title="Zu deinem Profil")
    img.avatar(data-cy="avatar" :src="authStore.getAvatarUrl" alt="Dein Avatar-Bild")
  button.btn_icon.outline.rounded.btn_logout(
    name="button logout"
    title="Klicken zum Ausloggen"
    @click="onLogoutClick"
  )
    SvgIcon(icon-name="sign-out" :size="ICON_SIZE.xs")
</template>

<style lang='scss' scoped>
.menu-header {
  align-self: stretch;
  display: flex;
  gap: 1em;
  align-items: center;

  > a {
    align-self: stretch;
  }
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
}

.link-profile {
  width: 38px;
}

.username {
  font-weight: 500;
}

.avatar {
  max-width: 38px;
  border-radius: 50%;
  overflow: hidden;
}

.btn_logout {
  --color: white;
  --color-bg: rgba(255, 255, 255, 0.15);

  @media (prefers-color-scheme: light) {
    --color: black;
    --color-bg: rgba(0, 0, 0, 0.15);
  }

  outline: none;

  &:focus,
  &:hover {
    background-color: var(--color-bg);
  }

  .svg-icon {
    fill: var(--color);
  }
}
</style>