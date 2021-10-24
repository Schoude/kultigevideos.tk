<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { apiClient } from '../../api';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const loginData = reactive({ email: '', password: '' });
const isLoading = ref(false);

async function onFormSubmit() {
  isLoading.value = true
  try {
    const res = await apiClient.post({ url: '/api/v1/login', body: JSON.stringify(loginData), mode: 'cors', });
    console.log(res.data);
    console.log(res.status);
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    isLoading.value = false;
  }
}

</script>

<template lang='pug'>
article.form-login.card
  h1.heading(data-cy="heading") Bitte melde dich an.
  form(@submit.prevent="onFormSubmit")
    .form-field
      label(
        data-cy="label-email"
        for="email"
      ) E-Mail
      input#email(
        data-cy="email"
        type="email"
        name="email"
        autocomplete="email"
        required
        v-model.trim='loginData.email'
      )

    .form-field
      label(
        data-cy="label-password"
        for="password"
      ) Passwort
      input#password(
        data-cy="password"
        type="password"
        name="password"
        autocomplete="password"
        required
        v-model.trim='loginData.password'
      )
    .form-actions
      button.btn.btn_primary(type="submit") Einloggen
  LoaderIndeterminate(:class="{ visible: isLoading }")
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.form-login {
  position: relative;
}

.heading {
  text-align: center;
  font-size: 1.25em;

  @include mq("t-p") {
    font-size: 2em;
  }
}
</style>