<script setup lang='ts'>
import { ref } from 'vue';
import KvMenu from '../forms/elements/KvMenu.vue';
import KvMenuButton from '../forms/elements/KvMenuButton';
import { useCommentStore } from '../../stores/comments';
import type { SortingType } from '../../stores/comments';

const commentStore = useCommentStore();

const forceClose = ref(false);

function onSelectSortingClick(sortingType: SortingType) {
  commentStore.setSelectedSortingType(sortingType);
  forceClose.value = true;
}

function onMenuToggled(openStatus: boolean) {
  if (openStatus) {
    forceClose.value = false;
  }
}
</script>

<template lang='pug'>
KvMenu.comment-sorter(
  :force-close="forceClose"
  icon-name="sort"
  :is-icon-button="false"
  has-icon label-button="Sortieren nach..."
  menu-position="left"
  @menu:toggled="onMenuToggled"
)
  KvMenuButton(
    :class="{ selected: commentStore.isSelectedSortingType('newest') }"
    @click="onSelectSortingClick('newest')"
  ) Neuste zuerst
  KvMenuButton(
    :class="{ selected: commentStore.isSelectedSortingType('most-liked') }"
    @click="onSelectSortingClick('most-liked')"
  ) Meiste Likes
  KvMenuButton(
    :class="{ selected: commentStore.isSelectedSortingType('most-disliked') }"
    @click="onSelectSortingClick('most-disliked')"
  ) Meiste Dislikes
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.kv-menu {
  &:deep() {
    .kv-menu-btn--toggle {
      padding: 0;

      @include mq("t-p") {
        padding: revert;
      }
    }

    .label-toggle-button {
      font-size: 20px;
    }
  }
}
</style>