<script setup lang='ts'>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useCommentStore } from '../../stores/comments';
import type { IComment } from '../../types/models/comment'
import { ICON_SIZE } from '../gfx/icons/icon-data';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
import CommentMetaActions from './CommentMetaActions.vue';
import CommentCreate from './CommentCreate.vue';
import type { UserSlim } from '../../types/models/user';
import { useMediaMatcher } from '../../composables/media-matcher';
import CommentEdit from './CommentEdit.vue';
import KvUploaderLike from '../gfx/KvUploaderLike';
import KvUploaderLikeDisplay from '../gfx/KvUploaderLikeDisplay';

const props = withDefaults(defineProps<{ comment: IComment, isReply?: boolean }>(), { isReply: false });

const authStore = useAuthStore();
const commentsStore = useCommentStore();
const { getLocaleDateString } = usePageHelpers();

const authorIsUploader = computed(() => props.comment.author?._id === props.comment.uploader?._id);
const userIsAuthorOrAdmin = computed(() => props.comment.author?._id === authStore.getUserId || authStore.userIsAdmin);
const userIsUploader = computed(() => authStore.getUserId === props.comment.uploader?._id);

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
const showReplyToggle = computed(() => props.comment.replyCount as number > 0);
const showEditMode = ref(false);

const getCommentId = computed(() => props.comment._id as string);

const uploaderWroteEveryReply = computed(() => {
  return props.comment.replies?.every(reply => reply.author?._id === props.comment.uploader?._id);
});

const uploaderWroteReply = computed(() => {
  return props.comment.replies?.some(reply => reply.author?._id === props.comment.uploader?._id);
});

const getUploaderData = computed(() => props.comment.uploader as UserSlim);

const getReplyToggleText = computed(() => {
  const answerString = (props.comment.replyCount as number) > 1 ? 'Antworten' : 'Antwort';

  if (
    useMediaMatcher().matchScreen('t-p').value
    && uploaderWroteEveryReply.value
  ) {
    return showReplies.value
      ? `${props.comment.replyCount} ${answerString} von ${(getUploaderData.value as UserSlim).username} ausblenden`
      : `${props.comment.replyCount} ${answerString} von ${(getUploaderData.value as UserSlim).username} anzeigen`;
  } else if (
    useMediaMatcher().matchScreen('t-p').value
    && uploaderWroteReply.value
    && (props.comment.replyCount as number) > 1
  ) {
    return showReplies.value
      ? `${props.comment.replyCount} ${answerString} von ${(getUploaderData.value as UserSlim).username} und anderen ausblenden`
      : `${props.comment.replyCount} ${answerString} von ${(getUploaderData.value as UserSlim).username} und anderen anzeigen`;
  } else {
    return showReplies.value
      ? `${props.comment.replyCount} ${answerString} ausblenden`
      : `${props.comment.replyCount} ${answerString} anzeigen`;
  }
});

onMounted(() => {
  commentHasOverFlow.value = (commentTextInner.value as HTMLParagraphElement).scrollHeight > (commentText.value as HTMLDivElement).clientHeight;
});

watch(() => props.comment.text, () => {
  // wait for transition to finish
  setTimeout(async () => {
    await nextTick(() => commentHasOverFlow.value = (commentTextInner.value as HTMLParagraphElement).scrollHeight > (commentText.value as HTMLDivElement).clientHeight);
  }, 200);
})

onBeforeUnmount(() => useMediaMatcher().destroy());

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

function onEditModeClose() {
  showEditMode.value = false;
}

async function onToggleHeartClick(status: boolean) {
  if (sentimentLoading.value) return
  sentimentLoading.value = true;

  await commentsStore.toggleHeartOfComment(props.comment, status);

  sentimentLoading.value = false;
}
</script>

<template lang='pug'>
article.comment-list-item
  Transition(name="fade-fast")
    CommentMetaActions.meta-actions(
      v-if="userIsAuthorOrAdmin && showEditMode === false"
      :comment="comment"
      @toggle:edit-mode="() => showEditMode = true"
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
      span.edited(v-if="comment.edited") (editiert)

    Transition(name="fade-fast" mode="out-in")
      template(v-if="showEditMode === false")
        .comment-display
          .comment-text(ref="commentText" :class="{ open: showMoreOpen }")
            p.comment-text__inner(ref='commentTextInner') {{ comment.text }}
          .comment-text__actions(v-if="commentHasOverFlow")
            button.more-button(@click="onToggleShowMore") {{ showMoreOpen ? 'WENIGER ANZEIGEN' : 'MEHR ANZEIGEN' }}
      template(v-else)
        CommentEdit(
          :is-reply="isReply"
          :comment-id="getCommentId"
          :parent-id="props.comment.parentId"
          :comment-text="props.comment.text"
          @close="onEditModeClose"
        )

    .comment-actions
      .sentiment
        button.count(data-cy="btn-like" title="Mag ich" @click="likeComment")
          SvgIcon.icon.icon-like(:icon-name="getIconLike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-likes") {{ comment.likes.length }}
        button.count(data-cy="btn-dislike" title="Mag ich nicht" @click="dislikeComment")
          SvgIcon.icon.icon-dislike(:icon-name="getIconDislike" :size="ICON_SIZE.xxs")
          span.counter(data-cy="counter-dislikes") {{ comment.dislikes.length }}

      // Uploader like/heart
      .uploader-like-display(v-if="props.comment.likedByUploader && !userIsUploader")
        KvUploaderLikeDisplay(:imageUrl="getUploaderData.meta.avatarUrl" :title='`Herz von ${getUploaderData.username}`')
      .uploader-like-toggle(v-if="userIsUploader && !authorIsUploader")
        Transition(name="fade-fast" mode="out-in")
          template(v-if="props.comment.likedByUploader")
            KvUploaderLike(
              :imageUrl="getUploaderData.meta.avatarUrl"
              :isLiked="true"
              title="Herz entfernen"
              @click="onToggleHeartClick(false)"
            )
          template(v-else)
            KvUploaderLike(
              :imageUrl="getUploaderData.meta.avatarUrl"
              :isLiked="false"
              title="Herz verteilen"
              @click="onToggleHeartClick(true)"
            )

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
        img.avatar(
          v-if="uploaderWroteReply"
          :src="getUploaderData?.meta.avatarUrl"
          :alt="`Avatarbild von ${getUploaderData?.username}`"
        )
        span.text {{ getReplyToggleText }}

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
    align-self: flex-start;
  }
}

.author-name {
  font-weight: 500;

  &.is-uploader {
    background-color: rgb(83, 83, 83);
    padding: 0.125em 0.5em;
    border-radius: 50px;
    color: white;
  }
}

.date,
.edited {
  font-size: 14px;
  opacity: 0.7;
}

.content-col {
  flex-grow: 1;
}

.comment-text {
  margin-block: 0.5em;
  max-height: 4.5rem;
  overflow: hidden;

  &.open {
    max-height: revert;
  }
}

.comment-text__inner {
  white-space: pre-wrap;
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
  flex-wrap: wrap;
  gap: 1em;
}

.sentiment {
  display: flex;
  gap: 0.5em;
}

.uploader-like-display,
.uploader-like-toggle {
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: center;
  gap: 0.5em;

  .avatar {
    width: 25px;

    @include mq("t-p") {
      display: none;
    }
  }
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