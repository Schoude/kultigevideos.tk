<script setup lang='ts'>
import { computed, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCommentStore } from '../../stores/comments';
import { useVideoStore } from '../../stores/video';
import CommentCreate from './CommentCreate.vue';
import TheCommentsList from './TheCommentsList.vue';
import CommentSorter from './CommentSorter.vue';

const commentsStore = useCommentStore();
const videoStore = useVideoStore();

const router = useRouter();

const getCommentCountLabel = computed(() => commentsStore.getCommentsCount !== 1 ? 'Kommentare' : 'Kommentar');

watch(() => videoStore.currentVideo, async (newVideo) => {
  await commentsStore.fetchCommentsOfVideo(newVideo?.hash as string);
})

onUnmounted(() => commentsStore.resetCommentData());

await commentsStore.fetchCommentsOfVideo(router.currentRoute.value.params.hash as string);
</script>

<template lang='pug'>
section.the-comment-display
  .comments-meta-data
    p.comments-count {{ commentsStore.getCommentsCount }} {{ getCommentCountLabel }}
    // CommentSorter with composition fn that returns the sorted comments
    // pass them to TheCommentsList
    CommentSorter(
      v-if="commentsStore.getCommentsCount > 1"
    )
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

.comments-count {
  font-size: 20px;
}
</style>