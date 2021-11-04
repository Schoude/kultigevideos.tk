<script setup lang='ts'>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();

const previewImageLoaded = ref(false)
const newAvatarLabel = ref<HTMLLabelElement | null>(null);
const previewImageInputEl = ref<HTMLInputElement | null>(null);
const previewImageEl = ref<HTMLImageElement | null>(null);
const previewImageFile = ref<File | null>(null);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);

  if (file) {
    canvasResize(file);

    // previewImageFile.value = file
    previewImageLoaded.value = true;
  }
}

function onDeselectClick() {
  (previewImageInputEl.value as HTMLInputElement).value = '';
  (previewImageEl.value as HTMLImageElement).src = '';
  previewImageFile.value = null;
  previewImageLoaded.value = false;
}

function canvasResize(imageFile: File) {
  const tempImage = new Image();
  tempImage.src = URL.createObjectURL(imageFile);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  tempImage.addEventListener('load', () => {
    const ratio = parseFloat((tempImage.width / tempImage.height).toFixed(2));

    canvas.height = 256;
    canvas.width = canvas.height * ratio;

    // Draw image and export to a data-uri
    // ctx?.drawImage(previewImageEl.value as HTMLImageElement,
    //   600, 800,
    //   1200, 1200,
    //   0, 0,
    //   canvas.width, canvas.height);
    // TODO: figure out how to center and square crop

    ctx?.drawImage(tempImage, 0, 0, canvas.width, canvas.height);

    const dataURI = canvas.toDataURL();

    // get array parts for Uint8Array
    const blobBin = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }

    const convertedFile = new File([new Uint8Array(array)], imageFile.name, { type: 'image/jpg' });

    (previewImageEl.value as HTMLImageElement).src = dataURI;
    previewImageFile.value = convertedFile
    tempImage.remove();
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