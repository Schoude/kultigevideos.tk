<script setup lang='ts'>
import { ref } from 'vue';
import UserProfileDetails from '../../components/UserProfileDetails.vue';
import LoaderIndeterminate from '../../components/gfx/loaders/LoaderIndeterminate.vue';
const isLoading = ref(false);
</script>

<template lang='pug'>
main.profile
  LoaderIndeterminate(:class="{ visible: isLoading }")
  UserProfileDetails(
    @loading:start="isLoading = true"
    @loading:end="isLoading = false"
  )
</template>

<style lang='scss' scoped>
.profile {
  position: relative;
}
</style>