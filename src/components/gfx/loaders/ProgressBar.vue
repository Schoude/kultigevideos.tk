<script setup lang='ts'>
withDefaults(defineProps<{ loaded: number }>(), { loaded: 0 })
</script>


<template lang="pug">
.progress-bar(data-cy="progress-bar")
  .progress-bar__indicator(
    :style="{ width: `${loaded}%` }"
    data-cy="progress-indicator"
  )
</template>

<style lang="scss">
.progress-bar {
  --background-trail: #535353;

  position: relative;
  min-width: 100px;
  height: 5px;
  margin: 5px 0;
  background-color: var(--background-trail);

  @media (prefers-color-scheme: light) {
    --background-trail: #929292;
  }
}

.progress-bar__indicator {
  transition: width 0.2s ease;
  background-color: var(--color-confirm);
  position: absolute;
  inset: 0;
}
</style>