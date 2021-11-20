<script setup lang='ts'>
import { defineComponent, useAttrs } from 'vue';
import SvgIcon from '../../gfx/icons/SvgIcon.vue';

defineComponent({ inheritAttrs: false })

const attrs = useAttrs() as { name: string }
defineProps<{ checked: boolean }>()
const emits = defineEmits<{ (e: 'update:checked', value: boolean): void }>()

function onInput($event: Event) {
  emits('update:checked', ($event.target as HTMLInputElement).checked)
}

</script>

<template lang='pug'>
.kv-checkbox(:class="{ checked: checked }")
  .checked_container
    SvgIcon.icon__checked(icon-name="check")
  input.hidden(
    type="checkbox"
    :name="attrs.name"
    :id="attrs.name"
    @input="onInput"
    :checked="checked"
  )
  label.checkbox__label(:for="attrs.name")
    slot
</template>

<style lang='scss' scoped>
.kv-checkbox {
  display: inline-flex;
  gap: 0.5em;
  cursor: pointer;

  &.checked {
    .checked_container {
      border-color: var(--color-confirm);
    }

    .icon__checked {
      opacity: 1;
    }
  }
}

.hidden {
  display: none;
}

.checked_container {
  width: 24px;
  height: 24px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
}

.icon__checked {
  opacity: 0;
  transition: opacity 0.2s ease;
  fill: var(--color-confirm);
}

.checkbox__label {
  cursor: pointer;
}
</style>