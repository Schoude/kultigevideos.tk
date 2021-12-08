<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';
import { computed, reactive, ref } from 'vue';
import { useCommentStore } from '../../stores/comments';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';
import KvTextarea from '../forms/elements/KvTextarea.vue';

const props = withDefaults(defineProps<{
  commentId: string,
  parentId?: string,
  commentText: string,
  isReply: boolean,
}>(), { isReply: false });
const emit = defineEmits(['close']);

const editedCommentId = ref(`edited-comment-${props.commentId}`);

const commentsStore = useCommentStore();

const editedCommentData = reactive({ editedComment: props.commentText });
const editedCommentMinLength = 1;
const editedCommentMaxLength = 1000;

const wasFocused = ref(false);
const isLoading = ref(false);

const rules = computed(() => ({
  editedComment: {
    required,
    minLength: minLength(editedCommentMinLength),
    maxLength: maxLength(editedCommentMaxLength),
  }
}))

const v$ = useVuelidate(rules, editedCommentData, { $rewardEarly: true });

const textNotEdited = computed(() => props.commentText === editedCommentData.editedComment);

function onFocus() {
  wasFocused.value = true;
}

function clearCommentInput() {
  editedCommentData.editedComment = '';
  v$.value.$reset();
  wasFocused.value = false;
}

function onCancelClick() {
  clearCommentInput();
  emit('close');
}

async function onEditCommentClick() {
  await v$.value.editedComment.$validate();

  if (v$.value.$invalid || isLoading.value) return;
  isLoading.value = true;

  const editedComment: { _ìd: string; editedText: string } = {
    _ìd: props.commentId,
    editedText: editedCommentData.editedComment
  };

  let res = await commentsStore.editComment(editedComment._ìd, editedComment.editedText)

  if (res?.status === 200) {
    if (props.isReply) {
      commentsStore.editCommentlocal({
        _id: props.commentId,
        parentId: props.parentId,
        isReply: props.isReply,
        commentText: editedComment.editedText
      });
    } else {
      commentsStore.editCommentlocal({
        _id: props.commentId,
        isReply: props.isReply,
        commentText: editedComment.editedText
      });
    }

    onCancelClick();
  }

  isLoading.value = false;
}
</script>

<template lang='pug'>
.comment-edit
  LoaderIndeterminate(:class="{ visible: isLoading }" style="margin-top: 1em;")
  form.comment-edit__inner(
    :id="editedCommentId"
    @submit.prevent="onEditCommentClick"
  )
    .form-field
      KvTextarea(
        v-model="editedCommentData.editedComment"
        @on:focus="onFocus"
        :autofocus="true"
        placeholder-text="Kommentar editieren"
      )
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.editedComment.$dirty && v$.editedComment.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-edited-comment-required" v-if="v$.editedComment.required.$invalid") Feld ist erforderlich.
            p.form-validation_error-message(data-cy="error-edited-comment-min" v-else-if="v$.editedComment.minLength.$invalid") Der Kommentar muss min. {{ editedCommentMinLength }} Zeichen lang sein.
            p.form-validation_error-message(data-cy="error-edited-comment-mmax" v-else-if="v$.editedComment.maxLength.$invalid") Der Kommentar darf max. {{ editedCommentMaxLength }} Zeichen lang sein.

  .comment-edit__actions
    Transition(name="fade-fast")
      .comment-edit__actions--inner(v-if="editedCommentData.editedComment !== '' || wasFocused")
        button.btn.btn_cancel(type="button" @click="onCancelClick") Abbrechen
        button.btn.btn_primary(
          type="submit"
          :form="editedCommentId"
          :disabled="v$.$invalid || isLoading || textNotEdited"
        ) Änderungen speichern
</template>

<style lang='scss' scoped>
.comment-edit {
  width: 100%;
  position: relative;
  padding-top: 1.5em;

  .kv-textarea {
    width: 100%;
  }
}

.comment-edit__inner {
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

.comment-edit__actions {
  margin-block: 1em;
  display: flex;
  justify-content: flex-end;
  height: 36px;
}

.comment-edit__actions--inner {
  display: flex;
  gap: 1em;
}
</style>