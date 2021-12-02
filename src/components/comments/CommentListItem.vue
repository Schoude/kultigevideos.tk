<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useCommentStore } from '../../stores/comments';
import type { Comment } from '../../types/models/comment'
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
import CommentMetaActions from './CommentMetaActions.vue';
import CommentCreate from './CommentCreate.vue';

const props = withDefaults(defineProps<{ comment: Comment, isReply?: boolean }>(), { isReply: false });

const authStore = useAuthStore();
const commentsStore = useCommentStore();
const { getLocaleDateString } = usePageHelpers();

const authorIsUploader = computed(() => props.comment.author?._id === props.comment.uploader?._id);
const userIsAuthorOrAdmin = computed(() => props.comment.author?._id === authStore.getUserId || authStore.userIsAdmin);

const getIconLike = computed(() => props.comment.likes.includes(authStore.user?._id as string)
  ? 'thumbs-up-solid' : 'thumbs-up');

const getIconDislike = computed(() => props.comment.dislikes.includes(authStore.user?._id as string)
  ? 'thumbs-down-solid' : 'thumbs-down');

const sentimentLoading = ref(false);

const commentText = ref<HTMLDivElement | null>(null);
const commentTextInner = ref<HTMLParagraphElement | null>(null);
const commentHasOverFlow = ref(false);
const showMoreOpen = ref(false);

const showReplyInput = ref(false);
const showReplies = ref(false);
const showReplyToggle = computed(() => props.comment.replyCount as number > 0)

onMounted(() => {
  commentHasOverFlow.value = (commentTextInner.value as HTMLParagraphElement).scrollHeight > (commentText.value as HTMLDivElement).clientHeight;
});

async function likeComment() {
  if (sentimentLoading.value) return
  sentimentLoading.value = true;

  if (props.isReply) {
    await commentsStore.likeComment(props.comment._id as string, authStore.getUserId, props.comment.parentId);
  } else {
    await commentsStore.likeComment(props.comment._id as string, authStore.getUserId);
  }


  sentimentLoading.value = false;
}

async function dislikeComment() {
  if (sentimentLoading.value) return
  sentimentLoading.value = true;

  if (props.isReply) {
    await commentsStore.dislikeComment(props.comment._id as string, authStore.getUserId, props.comment.parentId);
  } else {
    await commentsStore.dislikeComment(props.comment._id as string, authStore.getUserId);
  }

  sentimentLoading.value = false;
}

function onToggleShowMore() {
  showMoreOpen.value = !showMoreOpen.value;
}

function onShowReplyInput() {
  showReplyInput.value = !showReplyInput.value;
}

function onShowRepliesClick() {
  showReplies.value = !showReplies.value;
}
</script>

<template lang='pug'>
article.comment-list-item
  CommentMetaActions.meta-actions(
    v-if="userIsAuthorOrAdmin"
    :comment="comment"
    @loading:delete-start=""
  )
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

    .comment-text(ref="commentText" :class="{ open: showMoreOpen }")
      p.comment-text__inner(ref='commentTextInner') {{ comment.text }}
    .comment-text__actions(v-if="commentHasOverFlow")
      button.more-button(@click="onToggleShowMore") {{ showMoreOpen ? 'WENIGER ANZEIGEN' : 'MEHR ANZEIGEN' }}

    .comment-actions
      .sentiment
        button.count(data-cy="btn-like" title="Mag ich" @click="likeComment")
          SvgIcon.icon.icon-like(:icon-name="getIconLike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-likes") {{ comment.likes.length }}
        button.count(data-cy="btn-dislike" title="Mag ich nicht" @click="dislikeComment")
          SvgIcon.icon.icon-dislike(:icon-name="getIconDislike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-dislikes") {{ comment.dislikes.length }}
      .reply-toggle(v-if="isReply === false")
        button.btn__reply.more-button(@click="onShowReplyInput") Antworten

    Transition(name="fade-fast" mode="out-in")
      CommentCreate(
        v-if="showReplyInput"
        is-reply
        :comment-id="comment._id"
        @close="onShowReplyInput"
      )

    .replies-container(v-if="showReplyToggle")
      button.btn_reply--show.more-button(@click="onShowRepliesClick")
        | {{ showReplies ? `${props.comment.replyCount} Antworten ausblenden` : `${props.comment.replyCount} Antworten anzeigen` }}
      .replies-list(:class="{ open: showReplies }")
        template(v-for="reply of comment.replies" :key="comment._id")
          CommentListItem(:comment="reply" is-reply)
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.comment-list-item {
  display: flex;
  gap: 1em;
  position: relative;

  & + & {
    margin-top: 2em;
  }
}

.meta-actions {
  position: absolute;
  right: 0;
  top: 0;
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

.content-col {
  flex-grow: 1;
}

.comment-text {
  margin-block: 0.5em;
  max-height: 4.25em;
  overflow: hidden;

  &.open {
    max-height: revert;
  }
}

.comment-text__inner {
  white-space: pre;
}

.comment-text__actions {
  margin-bottom: 0.5em;
}

.more-button {
  margin: 0;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 1em;
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

.btn__reply,
.btn_reply--show {
  text-transform: uppercase;
}

.btn_reply--show {
  margin-block: 1em;
}

.replies-list {
  height: 0;
  overflow: hidden;

  &.open {
    height: auto;
    overflow: revert;
  }
}
</style>