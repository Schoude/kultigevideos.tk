<script setup lang='ts'>
import { ref, watch, watchEffect } from 'vue';
import { useImageHelpers } from '../../composables/image-helpers';
import { useStorage } from '../../firebase/use-storage';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const { resize } = useImageHelpers();
const { uploadUserAvatar } = useStorage();

const previewImageLoaded = ref(false)
const newAvatarLabel = ref<HTMLLabelElement | null>(null);
const previewImageInputEl = ref<HTMLInputElement | null>(null);
const previewImageEl = ref<HTMLImageElement | null>(null);
const previewImageFile = ref<File | null>(null);
const isUploading = ref(false);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);

  if (file) {
    const { dataURI, convertedFile } = resize(file, 256);

    watch(dataURI, (newVal) => {
      (previewImageEl.value as HTMLImageElement).src = newVal;
    });

    watch(convertedFile, (newVal) => {
      previewImageFile.value = newVal
      previewImageLoaded.value = true;
    });
  }
}

function clearPreviewImage() {
  (previewImageInputEl.value as HTMLInputElement).value = '';
  (previewImageEl.value as HTMLImageElement).src = '';
  previewImageFile.value = null;
  previewImageLoaded.value = false;
}

function onDeselectClick() {
  if (isUploading.value) return;

  clearPreviewImage();
}

async function onUploadClick() {
  if (isUploading.value) return;

  isUploading.value = true;
  const { progress, newDownloadURL } = uploadUserAvatar(previewImageFile.value as File, authStore.getUserId)

  watch(progress, (newVal) => {
    console.log('progress', newVal);
  })

  watch(newDownloadURL, (url) => {
    authStore.setUserAvatar(url);
    // TODO: url to user model in DB
    clearPreviewImage();
    isUploading.value = false;
  })
}
</script>

<template lang='pug'>
.user-avatar-editor
  .current-avatar
    h3.avatar-label(data-cy="current-label") Aktueller Avatar
    img.user-avatar.avatar(data-cy="user-avatar" :src="authStore.getAvatarUrl" alt="current avatar")
    .file-picker(v-show="!previewImageLoaded")
      button.btn.btn_primary.btn_file-picker(
        data-cy="new-avatar-label"
        @click="() => newAvatarLabel?.click()"
      ) Neues Avatarbild auswählen...
      label(for="new-avatar" ref="newAvatarLabel")
      input#new-avatar(
        ref="previewImageInputEl"
        type="file"
        accept="image/jpeg"
        name="new-avatar"
        data-cy="input-new-avatar"
        @change="onFileChange"
      )
  .new-avatar__preview(v-show="previewImageLoaded")
    h3.avatar-label(data-cy="preview-label") Vorschau
    img.preview-image.user-avatar.avatar(
      ref="previewImageEl"
      data-cy="preview-image"
      alt="new avatar preview"
    )
    .actions
      button.btn.btn_cancel.file-deselect(
        v-if="previewImageLoaded"
        @click="onDeselectClick"
        data-cy="preview-avatar-deselect"
      ) Rückgängig
      button.btn.btn_primary.btn_upload(
        v-if="previewImageLoaded"
        data-cy="button-upload"
        @click="onUploadClick"
      ) Hochladen
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.user-avatar-editor {
  margin-bottom: 2em;

  @include mq("t-p") {
    display: flex;
    gap: 8em;
  }
}

.user-avatar {
  width: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2em;
}

.btn_file-picker {
  width: 100%;
  text-align: center;

  @include mq("p-l") {
    width: max-content;
  }
}

#new-avatar {
  display: none;
}

.avatar-label {
  margin-bottom: 0.5em;
  font-weight: 500;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 1em;

  button {
    flex: 1;
  }

  @include mq("t-p") {
    justify-content: revert;

    button {
      flex: revert;
    }
  }
}
</style>