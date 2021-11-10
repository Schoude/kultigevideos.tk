<script setup lang='ts'>
import useVuelidate from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { computed, reactive, ref, watchEffect } from 'vue';
import VideoFilePicker from '../../components/upload/VideoFilePicker.vue';
import { useNewVideoStore } from '../../stores/new-video';

const newVideoStore = useNewVideoStore();

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

async function onVideoSubmit() {
  await v$.value.$validate();
  if (!newVideoStore.videoFileLoaded || v$.value.$invalid || isLoading.value) return;

  newVideoStore.newVideoTitle = newVideoTextdata.title;
  newVideoStore.newVideoDescription = newVideoTextdata.description;
}
</script>

<template lang='pug'>
main.upload
  section.upload__inner
    VideoFilePicker
    template(v-if="newVideoStore.videoFileLoaded")
      form.video-text-data(
        name="video-form"
        @submit.prevent="onVideoSubmit"
      )
        .field_container
          h2.heading Videotitel
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
          h2.heading Videobeschreibung
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
          form="video-form"
          :disabled="!newVideoStore.videoFileLoaded || v$.$invalid || isLoading"
        ) Video hochladen
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.upload {
  padding-bottom: 6em;
}

.upload__inner {
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
</style>