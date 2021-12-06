<script setup lang='ts'>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useCommentStore } from '../../stores/comments';
import type { Comment } from '../../types/models/comment';
import KvMenu from '../forms/elements/KvMenu.vue';
import KvMenuButton from '../forms/elements/KvMenuButton';

const authStore = useAuthStore();
const commentStore = useCommentStore();
const props = defineProps<{ comment: Comment }>();

const userIsAuthor = computed(() => props.comment.author?._id === authStore.getUserId);
const foceClose = ref(false);

const isLoading = ref(false);

async function onCommentDeleteClick() {
  if (isLoading.value) return;

  isLoading.value = true;
  if (props.comment.parentId != null) {
    await commentStore.deleteComment(props.comment._id as string, authStore.getUserId, props.comment.parentId)
  } else {
    commentStore.deleteComment(props.comment._id as string, authStore.getUserId)
  }

  foceClose.value = true;
}
</script>

<template lang='pug'>
KvMenu.comment-meta-actions(
  :force-close="foceClose"
)
  KvMenuButton(
    v-if="userIsAuthor"
  ) Kommentar editieren
  KvMenuButton(
    @click="onCommentDeleteClick"
  ) Kommentar löschen
</template>

<style lang='scss' scoped>
</style>