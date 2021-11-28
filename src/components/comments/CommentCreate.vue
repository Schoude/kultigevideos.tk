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
const newCommentMinLenght = 3;
const newCommentMaxLenght = 500;

const isLoading = ref(false);

const rules = computed(() => ({
  newComment: {
    required,
    minLength: minLength(newCommentMinLenght),
    maxLength: maxLength(newCommentMaxLenght),
  }
}))

const v$ = useVuelidate(rules, newCommentData, { $rewardEarly: true });

function onCancelClick() {
  newCommentData.newComment = '';
  v$.value.$reset();
}

async function onCreateCommentClick() {
  if (v$.value.$invalid || isLoading.value) return;
  isLoading.value = true;

  await commentsStore.createComment({
    authorId: authStore.getUserId,
    text: newCommentData.newComment,
    videoId: videoStore.getCurrentVideoId
  })

  isLoading.value = false;
}
</script>

<template lang='pug'>
.comment-create
  LoaderIndeterminate(:class="{ visible: isLoading }")
  .comment-create__inner
    img.avatar(:src="authStore.getAvatarUrl" :alt="`Profilbild von ${authStore.getUserName}`")
    .form-field
      input#new-comment(
        type="text"
        name="new-comment"
        placeholder="Öffentlich kommentieren"
        v-model="v$.newComment.$model"
        @blur="v$.newComment.$validate"
      )
  Transition(name="fade-fast")
    .comment-create__actions(v-if="newCommentData.newComment !== ''")
      button.btn.btn_cancel(type="button" @click="onCancelClick") Abbrechen
      button.btn.btn_primary(type="button" @click="onCreateCommentClick") Kommentieren
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
    flex: 1 0 auto;
  }
}

.avatar {
  height: 48px;
}

.comment-create__actions {
  margin-block: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}
</style>