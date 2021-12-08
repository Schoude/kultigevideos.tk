<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useCommentStore } from '../../stores/comments';
import { useVideoStore } from '../../stores/video';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';
import type { IComment } from '../../types/models/comment'
import KvTextarea from '../forms/elements/KvTextarea.vue';

const props = withDefaults(defineProps<{ isReply?: boolean, commentId?: string }>(), { isReply: false });
const emit = defineEmits(['close']);

const newCommentId = ref(props.isReply && props.commentId ? `new-reply-${props.commentId}` : 'new-comment')

const authStore = useAuthStore();
const commentsStore = useCommentStore();
const videoStore = useVideoStore();

const newCommentData = reactive({ newComment: '' });
const newCommentMinLength = 3;
const newCommentMaxLength = 1000;

const wasFocused = ref(false);
const isLoading = ref(false);

const rules = computed(() => ({
  newComment: {
    required,
    minLength: minLength(newCommentMinLength),
    maxLength: maxLength(newCommentMaxLength),
  }
}))

const v$ = useVuelidate(rules, newCommentData, { $rewardEarly: true });

function onFocus() {
  wasFocused.value = true;
}

function clearCommentInput() {
  newCommentData.newComment = '';
  v$.value.$reset();
  wasFocused.value = false;
}

function onCancelClick() {
  clearCommentInput();
  emit('close');
}

async function onCreateCommentClick() {
  await v$.value.newComment.$validate();

  if (v$.value.$invalid || isLoading.value) return;
  isLoading.value = true;

  const newComment: IComment = {
    authorId: authStore.getUserId,
    uploaderId: videoStore.getCurrentVideoUploaderId,
    text: newCommentData.newComment,
    videoHash: videoStore.getCurrentVideoHash,
    likes: [],
    dislikes: [],
    replies: [],
    likedByUploader: false,
    edited: false
  };

  let res;

  if (props.isReply) {
    newComment.parentId = props.commentId
    res = await commentsStore.createComment(newComment)
  } else {
    res = await commentsStore.createComment(newComment)
  }

  if (res?.status === 201) {
    onCancelClick();

    const filledComment = commentsStore.fillNewCommentData(newComment, res.data.commentId, res.data.createdAt);
    commentsStore.createCommentLocal(filledComment);
  }

  isLoading.value = false;
}
</script>

<template lang='pug'>
.comment-create
  LoaderIndeterminate(:class="{ visible: isLoading }")
  form.comment-create__inner(
    :id="newCommentId"
    @submit.prevent="onCreateCommentClick"
  )
    img.avatar.avatar__comment(
      :src="authStore.getAvatarUrl"
      :alt="`Profilbild von ${authStore.getUserName}`"
      :class="{ 'is-reply': isReply }"
    )
    .form-field
      KvTextarea(
        v-model="newCommentData.newComment"
        @on:focus="onFocus"
        :autofocus="props.isReply"
        placeholder-text="Öffentlich kommentieren"
      )
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.newComment.$dirty && v$.newComment.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-new-comment-required" v-if="v$.newComment.required.$invalid") Feld ist erforderlich.
            p.form-validation_error-message(data-cy="error-new-comment-min" v-else-if="v$.newComment.minLength.$invalid") Der Kommentar muss min. {{ newCommentMinLength }} Zeichen lang sein.
            p.form-validation_error-message(data-cy="error-new-comment-mmax" v-else-if="v$.newComment.maxLength.$invalid") Der Kommentar darf max. {{ newCommentMaxLength }} Zeichen lang sein.

  .comment-create__actions
    Transition(name="fade-fast")
      .comment-create__actions--inner(v-if="newCommentData.newComment !== '' || wasFocused")
        button.btn.btn_cancel(type="button" @click="onCancelClick") Abbrechen
        button.btn.btn_primary(
          type="submit"
          :form="newCommentId"
          :disabled="v$.$invalid || isLoading"
        ) Kommentieren
</template>

<style lang='scss' scoped>
.comment-create {
  width: 100%;
  position: relative;
  padding-top: 1.5em;

  .kv-textarea {
    width: 100%;
  }
}

.comment-create__inner {
  display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;

  .form-field {
    margin-top: 0;
    align-self: flex-start;
    flex: 1 1 auto;
  }
}

.avatar__comment {
  align-self: flex-start;

  &.is-reply {
    width: 24px;
    height: 24px;
  }
}

.comment-create__actions {
  margin-block: 1em;
  display: flex;
  justify-content: flex-end;
  height: 36px;
}

.comment-create__actions--inner {
  display: flex;
  gap: 1em;
}
</style>