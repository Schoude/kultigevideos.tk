<script setup lang='ts'>
import { usePageHelpers } from '../../composables/page-helpers';
import MenuHeader from '../navigation/MenuHeader.vue';
const { getLogoPathSmall } = usePageHelpers();
</script>

<template lang='pug'>
header.the-header
  .logo
    RouterLink(to='/' data-cy="feed-link")
      img(:src="getLogoPathSmall" alt="Logo Kultige Videos")
  MenuHeader
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
</style>1