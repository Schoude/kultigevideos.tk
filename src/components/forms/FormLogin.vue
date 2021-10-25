<script setup lang='ts'>
import { ref, reactive } from 'vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../../router/routing-info';

const authStore = useAuthStore();
const router = useRouter();

const loginData = reactive({ email: '', password: '' });
const isLoading = ref(false);
const inputPassword = ref<HTMLInputElement | null>(null);
const passwordVisible = ref(false);

async function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;

  if (passwordVisible.value) inputPassword.value?.setAttribute('type', 'text');
  else inputPassword.value?.setAttribute('type', 'password');
}

async function onFormSubmit() {
  isLoading.value = true
  try {
    await authStore.login(loginData.email, loginData.password);
    await router.push({ name: ROUTE_NAMES.HOME });
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
      .form-field__inner
        input#password(
          ref="inputPassword"
          data-cy="password"
          type="password"
          name="password"
          autocomplete="password"
          required
          v-model.trim='loginData.password'
        )
        button.btn-icon(
          type="button"
          @click="togglePasswordVisibility"
          :title="passwordVisible ? 'Passwort nicht mehr anzeigen' : 'Passwort anzeigen'"
        )
          Transition(name="fade-fast" mode="out-in")
            SvgIcon(icon-name="eye-slash" v-if="passwordVisible")
            SvgIcon(icon-name="eye" v-else)
    .form-actions
      button.btn.btn_primary(type="submit") Einloggen
  LoaderIndeterminate(:class="{ visible: isLoading }")
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.form-login {
  position: relative;
  width: 100%;

  @include mq("p-l") {
    width: revert;
  }
}

.heading {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 1em;

  @include mq("p-m") {
    font-size: 2em;
  }
}

button[type="submit"] {
  width: 100%;
  font-size: 1.25em;
}

.btn-icon {
  width: 45px;
  background: transparent;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover,
  &:focus {
    opacity: 1;
  }
}

.svg-icon:deep() {
  @media (prefers-color-scheme: light) {
    path {
      fill: black;
    }
  }
}
</style>