<script setup lang='ts'>
import { inject, computed, ref, watch } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import type { Comment } from '../../types/models/comment';
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const authStore = useAuthStore();
const { handleClickOutside } = usePageHelpers();
const comment = inject<Comment>('comment') as Comment;

const userIsAuthor = computed(() => comment.author?._id === authStore.getUserId);
const metaActions = ref<HTMLElement | null>(null);
const actionsVisible = ref(false);

function onHandleClickedOutside(event: Event | PointerEvent) {
  handleClickOutside(event, metaActions.value as HTMLElement, () => {
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
</script>

<template lang='pug'>
.comment-meta-actions(ref="metaActions")
  .comment-meta-actions__inner
    button.icon(type="button" @click="toggleActionsVisible")
      SvgIcon(icon-name="ellipsis-v" :size="ICON_SIZE.xs")

    Transition(name="fade-fast")
      .meta-actions-container(v-if="actionsVisible")
        button.meta-action(
          v-if="userIsAuthor"
          type="button"
        ) Kommentar editieren
        button.meta-action(
          type="button"
        ) Kommentar löschen
</template>

<style lang='scss' scoped>
.comment-meta-actions {
  z-index: 1;
}

.comment-meta-actions__inner {
  position: relative;
}

.icon {
  --border-color: white;

  @media (prefers-color-scheme: light) {
    --border-color: black;
  }

  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  opacity: 0.5;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus {
    opacity: 1;
  }
}

@media (prefers-color-scheme: light) {
  svg {
    fill: black;
  }
}

.meta-actions-container {
  display: flex;
  flex-direction: column;
  background-color: var(--color-header);
  position: absolute;
  right: 0;
  transform: translateY(5px);
  width: max-content;
  padding-block: 0.5em;
}

.meta-action {
  padding-block: 0.25em;
  transition: background-color 0.2s ease;
  outline: none;

  &:hover,
  &:focus {
    background-color: var(--color-ui);
  }
}
</style>