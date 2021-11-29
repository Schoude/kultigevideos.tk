<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useComments } from '../../stores/comments';
import CommentCreate from './CommentCreate.vue';
import TheCommentsList from './TheCommentsList.vue';
const commentsStore = useComments();

const router = useRouter();

await commentsStore.fetchCommentsOfVideo(router.currentRoute.value.params.hash as string);
</script>

<template lang='pug'>
section.the-comment-display
  .comments-meta-data
    p.comments-count {{ commentsStore.getCommentsCount }} Kommentare
    .comments-sort Sortieren nach...
  CommentCreate
  TheCommentsList
</template>

<style lang='scss' scoped>
.comments-meta-data {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-bottom: 1em;
}

.comments-count,
.comments-sort {
  font-size: 20px;
}
</style>