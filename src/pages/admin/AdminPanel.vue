<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ICON_SIZE } from '../../components/gfx/icons/icon-data';
import SvgIcon from '../../components/gfx/icons/SvgIcon.vue';
import { ROUTE_NAMES } from '../../router/routing-info';

const router = useRouter();

async function navigateToRoute(name: ROUTE_NAMES) {
  await router.push({ name });
}
</script>

<template lang='pug'>
main.admin-panel
  nav.admin-navigation
    section.admin-navigation__card.with-header
      header
        button.btn_user__add.btn_icon.outline.rounded(
          title="Neuen Benutzer hinzufügen"
          @click="navigateToRoute(ROUTE_NAMES.USER_ADD)"
        )
          SvgIcon(icon-name="user-plus" :size="ICON_SIZE.xs")
      button.btn.btn_primary.btn_admin--navigation(
        @click="navigateToRoute(ROUTE_NAMES.USERS_OVERVIEW)"
      ) Zur Benutzerübersicht
    section.admin-navigation__card
      button.btn.btn_secondary.btn_admin--navigation(
        @click="navigateToRoute(ROUTE_NAMES.VIDEOS_OVERVIEW)"
      ) Zur Videoübersicht
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.admin-panel {
  display: grid;
  place-items: center;
  height: calc(100vh - var(--header-height));
}

.admin-navigation {
  display: flex;
  flex-direction: column;
  gap: 3em;

  @include mq("t-p") {
    flex-direction: row;
    gap: 5em;
  }
}

.admin-navigation__card {
  background-color: var(--color-ui);
  padding: 1.5em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.with-header {
    padding-top: 0;
  }

  header {
    padding: 1.5em 0;
  }
}

.btn_admin--navigation {
  font-size: 1.25em;

  @include mq("t-p") {
    font-size: 1.5em;
  }
}

.btn_user__add {
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