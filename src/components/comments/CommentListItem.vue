<script setup lang='ts'>
import { computed, ref } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useCommentStore } from '../../stores/comments';
import type { Comment } from '../../types/models/comment'
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const props = defineProps<{ comment: Comment }>();

const authStore = useAuthStore();
const commentsStore = useCommentStore();
const { getLocaleDateString } = usePageHelpers();

const authorIsUploader = computed(() => props.comment.author?._id === props.comment.uploader?._id);

const getIconLike = computed(() => props.comment.likes.includes(authStore.user?._id as string)
  ? 'thumbs-up-solid' : 'thumbs-up');

const getIconDislike = computed(() => props.comment.dislikes.includes(authStore.user?._id as string)
  ? 'thumbs-down-solid' : 'thumbs-down');

const sentimentLoading = ref(false);

async function likeComment() {
  if (sentimentLoading.value) return
  sentimentLoading.value = true;

  await commentsStore.likeComment(props.comment._id as string, authStore.getUserId);

  sentimentLoading.value = false;
}

async function dislikeComment() {
  if (sentimentLoading.value) return
  sentimentLoading.value = true;

  await commentsStore.dislikeComment(props.comment._id as string, authStore.getUserId);

  sentimentLoading.value = false;
}
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
    .comment-actions
      .sentiment
        button.count(data-cy="btn-like" title="Mag ich" @click="likeComment")
          SvgIcon.icon.icon-like(:icon-name="getIconLike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-likes") {{ comment.likes.length }}
        button.count(data-cy="btn-dislike" title="Mag ich nicht" @click="dislikeComment")
          SvgIcon.icon.icon-dislike(:icon-name="getIconDislike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-dislikes") {{ comment.dislikes.length }}
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
  margin-block: 0.5em;
}

.sentiment {
  display: flex;
  gap: 0.5em;
}

.count {
  display: flex;
  gap: 0.5em;
  align-items: center;

  @media (prefers-color-scheme: light) {
    svg {
      fill: black;
    }
  }
}

.counter {
  font-size: 14px;
}
</style>