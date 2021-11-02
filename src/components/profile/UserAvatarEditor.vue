<script setup lang='ts'>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();

const previewImageLoaded = ref(false)
const previewImageEl = ref<HTMLImageElement | null>(null);
const previewImageFile = ref<File | null>(null);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);

  if (file) {
    (previewImageEl.value as HTMLImageElement).src = URL.createObjectURL(file);
    previewImageFile.value = file
    previewImageLoaded.value = true;
  }
}

function onDeselectClick() {
  (previewImageEl.value as HTMLImageElement).src = '';
  previewImageFile.value = null;
  previewImageLoaded.value = false;
}
</script>

<template lang='pug'>
.user-avatar-editor
  img.user-avatar(data-cy="user-avatar" :src="authStore.getAvatarUrl")
  Transition(name="fade")
    .file-picker(v-if="!previewImageLoaded")
      label.btn.btn_primary.btn_file-picker(
        for="new-avatar"
        data-cy="new-avatar-label"
      ) Neues Avatarbild auswählen...
      input#new-avatar(
        type="file"
        accept="image/jpeg"
        name="new-avatar"
        data-cy="input-new-avatar"
        @change="onFileChange"
      )
    button.btn.btn_cancel.file-deselect(
      v-else
      @click="onDeselectClick"
      data-cy="preview-avatar-deselect"
    ) Rückgängig
  Transition(name="fade")
    .new-avatar__preview(v-show="previewImageLoaded")
      p(data-cy="preview-label") Vorschau
      img.preview-image.user-avatar(
        ref="previewImageEl"
        data-cy="preview-image"
      )
      button.btn.btn_primary.btn_upload(data-cy="button-upload") Hochladen
</template>

<style lang='scss' scoped>
.user-avatar {
  width: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1em;
}

.btn_file-picker {
  cursor: pointer;
}

#new-avatar {
  display: none;
}
</style>