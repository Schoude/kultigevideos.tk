<script setup lang='ts'>
import { computed } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import type { Comment } from '../../types/models/comment'

const props = defineProps<{ comment: Comment }>();

const { getLocaleDateString } = usePageHelpers();

const authorIsUploader = computed(() => props.comment.author?._id === props.comment.uploader?._id);
</script>

<template lang='pug'>
article.comment-list-item
  .avatar-col
    RouterLink(:to="`/profile/${comment.author?._id}`")
      img.avatar.avatar__comment(:src="comment.author?.meta.avatarUrl" :alt="`Profilbild von ${comment.author?.username}`")
  .content-col
    .author-info
      RouterLink(:to="`/profile/${comment.author?._id}`")
        span.author-name(
          :class="{ 'is-uploader': authorIsUploader }"
        ) {{ comment.author?.username }}
      span.date {{ getLocaleDateString(comment.createdAt, true) }}
    .comment-text {{ comment.text }}
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.comment-list-item {
  display: flex;
  gap: 1em;

  & + & {
    margin-top: 2em;
  }
}

.avatar-col {
  min-width: 40px;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  @include mq("t-p") {
    align-items: center;
    flex-direction: row;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}

.author-name {
  font-weight: 500;

  &.is-uploader {
    background-color: grey;
    padding: 0.125em 0.5em;
    border-radius: 50px;
    color: white;
  }
}

.date {
  font-size: 14px;
  opacity: 0.7;
}

.comment-text {
  margin-top: 0.5em;
}
</style>