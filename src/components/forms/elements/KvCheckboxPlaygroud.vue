<script setup lang='ts'>
import { ref } from 'vue';
import KvCheckbox from './KvCheckbox.vue';

const isTrue = ref(false);

</script>

<template lang='pug'>
.kv-checkbox-playgroud
  KvCheckbox(
    data-cy="checkbox"
    v-model:checked="isTrue"
    name="test"
  ) CHECK ME
  p.control checked value {{ isTrue }}
</template>

<style lang='scss' scoped>
</style>