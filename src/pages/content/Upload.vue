<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { computed, reactive, ref, watchEffect } from 'vue';
import VideoFilePicker from '../../components/upload/VideoFilePicker.vue';
import { useNewVideoStore } from '../../stores/new-video';
import LoaderIndeterminate from '../../components/gfx/loaders/LoaderIndeterminate.vue';
import ProgressBar from '../../components/gfx/loaders/ProgressBar.vue';
import { ROUTE_NAMES } from '../../router/routing-info';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const newVideoStore = useNewVideoStore();
const authStore = useAuthStore();

const isLoading = ref(false);

const titleMaxLength = 150;
const descriptionMaxLength = 1000;

const newVideoTextdata = reactive({
  title: '',
  description: '',
});

const rules = computed(() => ({
  title: {
    required,
    maxLength: maxLength(titleMaxLength),
  },
  description: {
    maxLength: maxLength(descriptionMaxLength),
  }
}));

const v$ = useVuelidate(rules, newVideoTextdata, { $rewardEarly: true });

watchEffect(() => {
  newVideoTextdata.title = newVideoStore.newVideoTitle;
});

const preventUpload = computed(() => !newVideoStore.videoFileLoaded || v$.value.$invalid || isLoading.value || authStore.userIsUser);

async function onVideoSubmit() {
  await v$.value.$validate();
  if (preventUpload.value) return;
  isLoading.value = true;

  newVideoStore.newVideoTitle = newVideoTextdata.title;
  newVideoStore.newVideoDescription = newVideoTextdata.description;
  try {
    await newVideoStore.uploadNewVideoData();
    const res = await newVideoStore.saveVideoDataToDB();
    if (res?.status === 201) {
      router.push({ name: ROUTE_NAMES.FEED });
    }
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template lang='pug'>
main.upload
  LoaderIndeterminate.loader-upload(:class="{ visible: isLoading }")
  section.upload__inner
    VideoFilePicker
    template(v-if="newVideoStore.videoFileLoaded")
      form.video-text-data(
        id="video-form"
        name="video-form"
        @submit.prevent="onVideoSubmit"
      )
        .field_container
          h2.heading(data-cy="heading-video-title") Videotitel
          .form-field
            input(
              type="text"
              maxlength="150"
              v-model.trim='v$.title.$model'
              @blur="v$.title.$validate()"
            )
          Transition(name="fade-fast" mode="out-in")
            template(v-if="v$.title.$dirty && v$.title.$invalid")
              Transition(name="fade-fast" mode="out-in")
                p.form-validation_error-message(data-cy="error-title-required" v-if="v$.title.required.$invalid") Feld ist erforderlich.
                p.form-validation_error-message(data-cy="error-title-maxlength" v-else-if="v$.title.maxLength.$invalid") Der Titel darf max. {{ titleMaxLength }} Zeichen lang sein.

        .field_container
          h2.heading(data-cy="heading-video-description") Videobeschreibung
          .form-field
            textarea.description(
              v-model.trim='newVideoTextdata.description'
              maxlength="1000"
              @blur="v$.description.$validate()"
            )
          Transition(name="fade-fast" mode="out-in")
            template(v-if="v$.description.$dirty && v$.description.$invalid")
              Transition(name="fade-fast" mode="out-in")
                p.form-validation_error-message(data-cy="error-description-maxlength" v-if="v$.description.maxLength.$invalid") Die Beschreibung darf max. {{ descriptionMaxLength }} Zeichen lang sein.

      .actions
        button.btn.btn_primary(
          data-cy="btn-upload"
          type="submit"
          form="video-form"
          :disabled="!newVideoStore.videoFileLoaded || v$.$invalid || isLoading"
        ) Video hochladen
        Transition(name="fade")
          ProgressBar(
            v-if='isLoading'
            :loaded="newVideoStore.getProgressVideoUpload"
          )
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.upload {
  position: relative;
  padding-bottom: 6em;
  padding: 0;
  padding-bottom: 6em;

  .loader-upload {
    position: sticky;
    top: var(--header-height);
    z-index: 1;
  }
}

.upload__inner {
  padding: 0 1em;
  @include mq("t-l") {
    margin: 0 25%;
  }
}

.video-text-data {
  margin: 2em 0;
}

.field_container {
  &:not(:first-child) {
    margin-top: 2em;
  }

  .heading {
    margin-bottom: 0.5em;
  }
}

.description {
  width: 100%;
}

.actions {
  position: relative;
}

.progress-bar {
  margin-top: 1em;
}
</style>