<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { usePageHelpers } from '../../composables/page-helpers';
import { ROUTE_NAMES } from '../../router/routing-info';
import { useAuthStore } from '../../stores/auth';
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const authStore = useAuthStore();
const router = useRouter();
const { getLogoPathSmall } = usePageHelpers();

async function onLogoutClick() {
  await authStore.logout()
  await router.push({ name: ROUTE_NAMES.LOGIN });
  authStore.user = null;
}

</script>

<template lang='pug'>
header.the-header
  .logo
    RouterLink(to='/' data-cy="home-link")
      img(:src="getLogoPathSmall" alt="Logo Kultige Videos")
  button.btn_icon.outline.rounded.btn_logout(
    name="button logout"
    title="Klicken zum Ausloggen"
    @click="onLogoutClick"
  )
    SvgIcon(icon-name="sign-out" :size="ICON_SIZE.xs")
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.the-header {
  position: sticky;
  top: 0;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-header);
  height: var(--header-height);

  @media (prefers-color-scheme: light) {
    box-shadow: var(--shadow-weak);
  }
}

.logo {
  img {
    height: 38px;

    @include mq("t-p") {
      height: 52px;
    }
  }
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
</style>1