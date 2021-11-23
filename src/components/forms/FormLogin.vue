<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../../router/routing-info';
import { usePageHelpers } from '../../composables/page-helpers';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email } from '@vuelidate/validators'

const authStore = useAuthStore();
const router = useRouter();

const { getLogoPath } = usePageHelpers();
const isLoading = ref(false);
const inputPassword = ref<HTMLInputElement | null>(null);
const passwordVisible = ref(false);

const loginData = reactive({ email: '', password: '' });
const passwordMinLength = ref(5);
const rules = computed(() => ({
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(passwordMinLength.value),
  }
}))

const v$ = useVuelidate(rules, loginData, { $rewardEarly: true })

async function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;

  if (passwordVisible.value) inputPassword.value?.setAttribute('type', 'text');
  else inputPassword.value?.setAttribute('type', 'password');
}

async function onFormSubmit() {
  if (isLoading.value) {
    return;
  }

  const res = await v$.value.$validate()
  if (!res) {
    return;
  }

  isLoading.value = true
  try {
    await authStore.login(loginData.email, loginData.password);

    // navigate to watch page with saved video id.
    if (localStorage.getItem('videoId') != null) {
      const routingInfo: { name: string, params: Record<string, string | null>, query?: Record<string, string | null> } = {
        name: ROUTE_NAMES.WATCH,
        params: {
          hash: localStorage.getItem('videoId'),
        },
      }

      if (localStorage.getItem('startTime')) {
        Object.assign(routingInfo, { query: { t: localStorage.getItem('startTime') } });
      }

      await router.push(routingInfo);

      localStorage.removeItem('videoId');
      localStorage.removeItem('startTime');
    } else {
      await router.push({ name: ROUTE_NAMES.FEED });
    }
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template lang='pug'>
article.form-login.card
  img.logo(data-cy="logo" :src="getLogoPath" alt="Logo Kultige Videos")
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
        v-model.trim='v$.email.$model'
        @blur="v$.email.$validate()"
      )
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.email.$dirty && v$.email.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-email-required" v-if="v$.email.required.$invalid") Feld ist erforderlich.
            p.form-validation_error-message(data-cy="error-email-format" v-else-if="v$.email.email.$invalid") Keine gültige E-Mail-Adresse.

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
          v-model.trim='v$.password.$model'
          @blur="v$.password.$validate()"
        )
        button.btn-icon(
          type="button"
          @click="togglePasswordVisibility"
          :title="passwordVisible ? 'Passwort nicht mehr anzeigen' : 'Passwort anzeigen'"
        )
          Transition(name="fade-fast" mode="out-in")
            SvgIcon(icon-name="eye-slash" v-if="passwordVisible")
            SvgIcon(icon-name="eye" v-else)
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.password.$dirty && v$.password.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-password-required" v-if="v$.password.required.$invalid") Feld ist erforderlich.
            p.form-validation_error-message(data-cy="error-password-min" v-else-if="v$.password.minLength.$invalid") Das Passwort muss min. {{ passwordMinLength }} Zeichen lang sein.

    .form-actions
      button.btn.btn_primary(
        type="submit"
        :disabled="isLoading || v$.$invalid"
      ) Einloggen

  LoaderIndeterminate(:class="{ visible: isLoading }")
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.form-login {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include mq("p-l") {
    width: 350px;
  }
}

.logo {
  margin-bottom: 1em;
  max-width: 250px;

  @include mq("p-m") {
    max-width: 300px;
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

form {
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;

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