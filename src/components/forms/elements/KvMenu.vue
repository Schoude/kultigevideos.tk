<script setup lang='ts'>
import { ref, onBeforeUnmount, watch } from 'vue';
import { ICON_SIZE } from '../../gfx/icons/icon-data';
import { usePageHelpers } from '../../../composables/page-helpers';
import SvgIcon from '../../gfx/icons/SvgIcon.vue';

const props = withDefaults(defineProps<{ forceClose: boolean }>(), { forceClose: false });

watch(() => props.forceClose, (newVal) => {
  if (newVal) {
    actionsVisible.value = false;
  }
});

const { handleClickOutside } = usePageHelpers();
const actionsVisible = ref(false);
const menuEl = ref<HTMLElement | null>(null);

function onHandleClickedOutside(event: Event | PointerEvent) {
  handleClickOutside(event, menuEl.value as HTMLElement, () => {
    actionsVisible.value = false;
  })
}

function toggleActionsVisible() {
  actionsVisible.value = !actionsVisible.value;

  if (actionsVisible.value === false) return;

  document.body.addEventListener('click', onHandleClickedOutside);
}

watch(actionsVisible, (newVal) => {
  if (newVal === false) {
    document.body.removeEventListener('click', onHandleClickedOutside);
  }
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', onHandleClickedOutside);
});
</script>

<template lang='pug'>
.kv-menu(ref="menuEl")
  .kv-menu__inner
    button.icon(type="button" @click="toggleActionsVisible" aria-label="Kommentaraktionen öffnen")
      SvgIcon(icon-name="ellipsis-v" :size="ICON_SIZE.xs")
  Transition(name="fade-fast")
    .kv-menu__buttons(v-if="actionsVisible")
      slot
</template>

<style lang='scss' scoped>
</style>