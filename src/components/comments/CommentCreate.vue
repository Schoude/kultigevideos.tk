<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const newCommentData = reactive({ newComment: '' });
const newCommentMinLenght = 3;
const newCommentMaxLenght = 500;


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
</script>

<template lang='pug'>
.comment-create
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
      button.btn.btn_primary(type="button") Kommentieren
</template>

<style lang='scss' scoped>
.comment-create {
  width: 100%;
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