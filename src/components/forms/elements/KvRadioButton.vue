<script setup lang='ts'>
import { computed, defineComponent, ref, useAttrs } from 'vue';
defineComponent({ inheritAttrs: false })

const attrs = useAttrs() as { name: string, modelValue: string };
const props = defineProps<{ value: string }>();
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const isChecked = computed(() => attrs.modelValue === props.value);
const labelEl = ref<HTMLLabelElement | null>(null);

function onChange() {
  emits('update:modelValue', props.value)
}

function onRadioClick() {
  labelEl.value?.click();
}
</script>

<template lang='pug'>
.kv-radio-button(
  :class="{ checked: isChecked }"
  tabindex="0"
  role="button"
  @keyup.enter="onRadioClick"
  @keyup.space="onRadioClick"
)
  input.hidden(
    :id="attrs.name"
    type="radio"
    :name="attrs.name"
    :value="value"
    :checked="isChecked"
    @change="onChange"
  )
  label(
    ref="labelEl"
    :for="attrs.name"
    :data-cy="`label-${attrs.name}`"
  )
    .indicator(:class="{ checked: isChecked }")
      .indicator__dot
    slot
</template>

<style lang='scss' scoped>
.kv-radio-button {
  display: inline-block;

  &:focus {
    .indicator {
      opacity: 1;
    }
  }
}

.hidden {
  display: none;
}

label {
  display: flex;
  cursor: pointer;
}

.indicator {
  --border-color: white;

  @media (prefers-color-scheme: light) {
    --border-color: black;
  }

  height: 24px;
  width: 24px;
  border: 1px solid var(--border-color);
  padding: 2px;
  border-radius: 50%;
  margin-right: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &.checked {
    opacity: 1;

    .indicator__dot {
      transform: scale(1);
    }
  }
}

.indicator__dot {
  --color-dot: var(--color-confirm);

  @media (prefers-color-scheme: light) {
    --color-dot: #6ea134;
  }

  height: 12px;
  width: 12px;
  background-color: var(--color-dot);
  border-radius: inherit;
  transform: scale(0);
  transition: transform 0.2s ease;
}
</style>