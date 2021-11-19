<script setup lang='ts'>
import { ref } from 'vue';
import UserProfileDetails from '../../components/UserProfileDetails.vue';
import LoaderIndeterminate from '../../components/gfx/loaders/LoaderIndeterminate.vue';
import AuthUserDetails from '../../components/profile/AuthUserDetails.vue';

const isLoading = ref(false);
</script>

<template lang='pug'>
main.profile
  LoaderIndeterminate(:class="{ visible: isLoading }")
  .profile__inner
    UserProfileDetails(
      @loading:start="isLoading = true"
      @loading:end="isLoading = false"
    )
    Suspense
      template(#default)
        AuthUserDetails
      template(#fallback)
        h1 Lade Daten
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.profile {
  position: relative;
}

.profile__inner {
  max-width: 1350px;
  margin: 0 auto;

  @include mq("4k") {
    max-width: 1600px;
  }
}
</style>