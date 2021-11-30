<script setup lang='ts'>
import { onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useComments } from '../../stores/comments';
import { useVideoStore } from '../../stores/video';
import CommentCreate from './CommentCreate.vue';
import TheCommentsList from './TheCommentsList.vue';

const commentsStore = useComments();
const videoStore = useVideoStore();

const router = useRouter();

watch(() => videoStore.currentVideo, async (newVideo) => {
  await commentsStore.fetchCommentsOfVideo(newVideo?.hash as string);
})

onUnmounted(() => commentsStore.resetCommentData());

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
@use '../../styles/mixins' as *;

.comments-meta-data {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-bottom: 1em;

  @include mq("t-p") {
    flex-direction: row;
    align-items: center;
  }
}

.comments-count,
.comments-sort {
  font-size: 20px;
}
</style>