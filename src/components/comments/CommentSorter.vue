<script setup lang='ts'>
import { computed, ref } from 'vue';
import KvMenu from '../forms/elements/KvMenu.vue';
import KvMenuButton from '../forms/elements/KvMenuButton';

type SortingType = 'newest' | 'most-liked' | 'most-disliked';

const forceClose = ref(false);
const selectedSorting = ref<SortingType>('newest');

const isSelected = computed(() => {
  return (sortingType: SortingType) => {
    return sortingType === selectedSorting.value;
  }
})

function onSelectSortingClick(sortingType: SortingType) {
  if (selectedSorting.value === sortingType) return;
  selectedSorting.value = sortingType;
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
    :class="{ selected: isSelected('newest') }"
    @click="onSelectSortingClick('newest')"
  ) Neuste zuerst
  KvMenuButton(
    :class="{ selected: isSelected('most-liked') }"
    @click="onSelectSortingClick('most-liked')"
  ) meiste Likes
  KvMenuButton(
    :class="{ selected: isSelected('most-disliked') }"
    @click="onSelectSortingClick('most-disliked')"
  ) meiste Dislikes
</template>

<style lang='scss' scoped>
.kv-menu {
  &:deep() {
    .label-toggle-button {
      font-size: 20px;
    }
  }
}
</style>