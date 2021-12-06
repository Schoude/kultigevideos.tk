<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { usePageHelpers } from '../../../composables/page-helpers';

const props = withDefaults(defineProps<{
  modelValue: string,
  autofocus: boolean;
  placeholderText?: string;
}>(), {
  autofocus: false
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'on:focus'): void,
  (e: 'on:blur'): void
}>();

const { placeCursorAtPosition } = usePageHelpers();

const textbox = ref<HTMLDivElement | null>(null);
const isFocussed = ref(false);
const hasContent = computed(() => props.modelValue !== '');

onMounted(() => {
  if (props.modelValue) {
    (textbox.value as HTMLDivElement).innerText = props.modelValue;
  }

  if (props.autofocus) {
    textbox.value?.focus();
    placeCursorAtPosition(textbox.value as Node, 'end');
  }
})

watch(() => props.modelValue, (newVal) => {
  if (newVal === '') {
    (textbox.value as HTMLDivElement).innerText = '';
  }
})

function onInput() {
  emits('update:modelValue', textbox.value?.innerText as string);
}

function onFocus() {
  isFocussed.value = true;
  emits('on:focus');
}

function onBlur() {
  isFocussed.value = false;
  emits('on:blur');
}
</script>

<template lang="pug">
.kv-textarea

  .kv-textarea__placeholder(
    role="tooltip"
    v-show="!hasContent && !isFocussed"
  ) {{ placeholderText }}

  .kv-textarea__textcontent(
    ref="textbox"
    role="texarea"
    contenteditable
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  )
</template>

<style scoped lang="scss">
.kv-textarea {
  min-height: 1em;
  width: 320px;
  padding: 0.5em 0;
  position: relative;
  border-bottom: 1px solid var(--color-accent-low);
  transition: border-bottom 0.3s ease;

  &:hover {
    border-bottom: 1px solid var(--color-accent-med);
  }

  &:focus-within {
    border-bottom: 1px solid var(--color-accent-full);
  }
}

.kv-textarea__placeholder {
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  opacity: 0.75;
}

.kv-textarea__textcontent {
  outline: none;
}
</style>
