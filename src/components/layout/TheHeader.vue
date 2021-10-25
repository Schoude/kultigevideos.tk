<script setup lang='ts'>
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
ICON_SIZE
</script>

<template lang='pug'>
header.the-header
  button.btn_icon.outline.rounded.btn_logout(
    name="button logout"
    title="Klicken zum Ausloggen"
  )
    SvgIcon(icon-name="sign-out" :size="ICON_SIZE.xs")
</template>

<style lang='scss' scoped>
.the-header {
  position: sticky;
  top: 0;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: end;

  background-color: var(--color-header);
  height: var(--header-height);

  @media (prefers-color-scheme: light) {
    box-shadow: var(--shadow-weak);
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