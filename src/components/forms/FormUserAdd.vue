<script setup lang='ts'>
import type { UserRole } from '../../types/models/user';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, email } from '@vuelidate/validators'
import { computed, ref, reactive } from 'vue';
import SvgIcon from '../gfx/icons/SvgIcon.vue';
import KvRadioButton from './elements/KvRadioButton.vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const isLoading = ref(false);

const newUser = reactive<{
  username: string,
  email: string,
  role: UserRole,
  password: string
}>({
  username: '',
  email: '',
  role: 'user',
  password: ''
});

const passwordMinLength = ref(5);
const rules = computed(() => ({
  username: {
    required,
  },
  email: {
    required,
    email
  },
  password: {
    required,
    minLength: minLength(passwordMinLength.value),
  },
  role: {
    required
  }
}))

const v$ = useVuelidate(rules, newUser, { $rewardEarly: true })


const inputPassword = ref<HTMLInputElement | null>(null);
const passwordVisible = ref(false);
async function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;

  if (passwordVisible.value) inputPassword.value?.setAttribute('type', 'text');
  else inputPassword.value?.setAttribute('type', 'password');
}

</script>

<template lang='pug'>
.form-user-add
  h1 Neuen Benutzer anlegen
  form
    .form-field
      label(
        data-cy="label-username"
        for="username"
      ) Benutzername
      input#username(
        data-cy="username"
        type="text"
        name="username"
        autocomplete="username"
        required
        v-model.trim='v$.username.$model'
        @blur="v$.username.$validate()"
      )
      Transition(name="fade-fast" mode="out-in")
        template(v-if="v$.username.$dirty && v$.username.$invalid")
          Transition(name="fade-fast" mode="out-in")
            p.form-validation_error-message(data-cy="error-username-required" v-if="v$.username.required.$invalid") Feld ist erforderlich.

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

    section.user-role-selection
      h2 Rolle des Benutzers
      .role-select
        KvRadioButton(name='admin', value='admin', v-model="newUser.role") Admin
        KvRadioButton(name='maintainer', value='maintainer', v-model="newUser.role") Maintainer
        KvRadioButton(name='user', value='user', v-model="newUser.role") User

    .form-actions
      button.btn.btn_primary(
        type="submit"
        :disabled="isLoading || v$.$invalid"
      ) Benutzer anlegen

  LoaderIndeterminate(:class="{ visible: isLoading }")
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.form-user-add {
  @include mq("t-l") {
    padding: 0 30%;
  }
}

form {
  margin-top: 1.5em;
}

.role-select {
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin-top: 1.5em;
}

.form-actions {
  margin-top: 1.5em;
}

button[type="submit"] {
  width: 100%;

  @include mq("p-l") {
    width: max-content;
  }
}
</style>