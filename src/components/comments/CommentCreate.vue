<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useComments } from '../../stores/comments';
import { useVideoStore } from '../../stores/video';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const authStore = useAuthStore();
const commentsStore = useComments();
const videoStore = useVideoStore();

const newCommentData = reactive({ newComment: '' });
const newCommentMinLength = 3;
const newCommentMaxLength = 500;

const isLoading = ref(false);

const rules = computed(() => ({
  newComment: {
    required,
    minLength: minLength(newCommentMinLength),
    maxLength: maxLength(newCommentMaxLength),
  }
}))

const v$ = useVuelidate(rules, newCommentData, { $rewardEarly: true });

function clearCommentInput() {
  newCommentData.newComment = '';
  v$.value.$reset();
}

function onCancelClick() {
  clearCommentInput();
}

async function onCreateCommentClick() {
  if (v$.value.$invalid || isLoading.value) return;
  isLoading.value = true;

  const res = await commentsStore.createComment({
    authorId: authStore.getUserId,
    uploaderId: videoStore.getCurrentVideoUploaderId,
    text: newCommentData.newComment,
    videoHash: videoStore.getCurrentVideoHash,
    likes: [],
    dislikes: [],
    likedByUploader: false
  })

  if (res?.status === 201) {
    clearCommentInput();
  }

  isLoading.value = false;
}
</script>

<template lang='pug'>
.comment-create
  LoaderIndeterminate(:class="{ visible: isLoading }")
  form#new-comment.comment-create__inner(@submit.prevent="onCreateCommentClick")
    img.avatar(:src="authStore.getAvatarUrl" :alt="`Profilbild von ${authStore.getUserName}`")
    .form-field
      input#new-comment(
        type="text"
        name="new-comment"
        placeholder="Öffentlich kommentieren"
        autocomplete="off"
        v-model="v$.newComment.$model"
        @blur="v$.newComment.$validate"
      )
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.newComment.$dirty && v$.newComment.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-new-comment-required" v-if="v$.newComment.required.$invalid") Feld ist erforderlich.
            p.form-validation_error-message(data-cy="error-new-comment-min" v-else-if="v$.newComment.minLength.$invalid") Das Passwort muss min. {{ newCommentMinLength }} Zeichen lang sein.
            p.form-validation_error-message(data-cy="error-new-comment-mmax" v-else-if="v$.newComment.maxLength.$invalid") Das Passwort darf max. {{ newCommentMaxLength }} Zeichen lang sein.

  Transition(name="fade-fast")
    .comment-create__actions(v-if="newCommentData.newComment !== ''")
      button.btn.btn_cancel(type="button" @click="onCancelClick") Abbrechen
      button.btn.btn_primary(
        type="submit"
        form="new-comment"
        :disabled="v$.$invalid || isLoading"
      ) Kommentieren
</template>

<style lang='scss' scoped>
.comment-create {
  width: 100%;
  position: relative;
  padding-top: 1.5em;
}

.comment-create__inner {
  display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;

  .form-field {
    margin-top: 0;
    align-self: flex-start;
    flex: 1 0 auto;
  }
}

.avatar {
  height: 48px;
  align-self: flex-start;
}

.comment-create__actions {
  margin-block: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}
</style>