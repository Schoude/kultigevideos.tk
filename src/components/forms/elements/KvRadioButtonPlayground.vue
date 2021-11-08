<script setup lang='ts'>
import { ref } from 'vue';
import KvRadioButton from './KvRadioButton.vue';

const radioValue = ref('value1');

</script>

<template lang='pug'>
.kv-radio-button-playground
  .radios
    KvRadioButton(
      data-cy="value-1"
      v-model='radioValue'
      value="value1"
      name="value1"
    ) Wert 1
    KvRadioButton(
      data-cy="value-2"
      v-model='radioValue'
      value="value2"
      name="value2"
    ) Wert 2
    KvRadioButton(
      data-cy="value-3"
      v-model='radioValue'
      value="value3"
      name="value3"
    ) Wert 3
  .value-display {{ radioValue }}
</template>

<style lang='scss' scoped>
.radios {
  display: flex;
  gap: 1em;
}
</style>