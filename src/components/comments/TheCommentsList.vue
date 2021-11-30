<script setup lang='ts'>
import { useCommentStore } from '../../stores/comments';
import CommentListItem from './CommentListItem.vue';

const commentStore = useCommentStore();
</script>

<template lang='pug'>
.the-comments-list
  template(v-for="comment of commentStore.getComments" :key="comment._id")
    CommentListItem(:comment="comment")
</template>

<style lang='scss' scoped>
.the-comments-list {
  margin-top: 2em;
}
</style>