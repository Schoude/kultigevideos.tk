<script setup lang='ts'>
import { ref, onBeforeUnmount, watch } from 'vue';
import { ICON_SIZE } from '../../gfx/icons/icon-data';
import { usePageHelpers } from '../../../composables/page-helpers';
import SvgIcon from '../../gfx/icons/SvgIcon.vue';

const props = withDefaults(defineProps<{
  forceClose: boolean;
  iconName?: string;
  isIconButton?: boolean;
  hasIcon?: boolean;
  labelButton?: string;
  menuPosition?: 'right' | 'left';
}>(), {
  forceClose: false,
  iconName: 'ellipsis-v',
  isIconButton: true,
  hasIcon: false,
  menuPosition: 'right',
});

const emit = defineEmits(['menu:toggled']);

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
    emit('menu:toggled', false);
  })
}

function toggleActionsVisible() {
  actionsVisible.value = !actionsVisible.value;

  emit('menu:toggled', actionsVisible.value);

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
    template(v-if="isIconButton")
      button.icon(type="button" @click="toggleActionsVisible" aria-label="Kommentaraktionen öffnen")
        SvgIcon(:icon-name="iconName" :size="ICON_SIZE.xs")
    template(v-else)
      button.btn.kv-menu-btn--toggle(type="button" @click="toggleActionsVisible" aria-label="Kommentaraktionen öffnen")
        SvgIcon(
          v-if="hasIcon"
          :icon-name="iconName"
          :size="ICON_SIZE.m"
        )
        span.label-toggle-button {{ labelButton }}
    Transition(name="fade-fast")
      .kv-menu__buttons(
        v-if="actionsVisible"
        :class="{ right: menuPosition === 'right', left: menuPosition === 'left' }"
      )
        slot
</template>

<style lang='scss' scoped>
</style>