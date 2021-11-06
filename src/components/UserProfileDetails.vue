<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routing-info';
import { useAuthStore } from '../stores/auth';
import UserAvatarEditor from './profile/UserAvatarEditor.vue';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required, sameAs } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);

const passwordChange = reactive({ newPassword: '', newPasswordConfirm: '' });
const passwordMinLength = ref(5);
const rules = computed(() => ({
  newPassword: {
    required,
    minLength: minLength(passwordMinLength.value),
  },
  newPasswordConfirm: {
    required,
    sameAs: sameAs(passwordChange.newPassword),
  }
}))

const v$ = useVuelidate(rules, passwordChange, { $rewardEarly: true });

async function onPasswordChange() {
  if (isLoading.value || v$.value.$invalid) return;
  isLoading.value = true;
  const res = await authStore.updatePassword(passwordChange.newPassword);
  isLoading.value = false;

  if (res?.status === 200) {
    passwordChange.newPassword = '';
    passwordChange.newPasswordConfirm = '';
  }
}

async function goToAdminPanel() {
  await router.push({ name: ROUTE_NAMES.ADMIN_PANEL });
}
</script>

<template lang='pug'>
section.user-profile-details
  UserAvatarEditor
  .detail-infos
    .entry
      h2.headline Name
      p.detail-info(data-cy="username") {{ authStore.getUserName }}
    .entry
      h2.headline E-Mail-Adresse
      p.detail-info(data-cy="email") {{ authStore.user?.email }}
    .entry
      h2.headline Rolle
      p.detail-info(data-cy="role") {{ authStore.getUserRoleText }}
  hr
  .password-change
    h2 Passwort ändern
    form(@submit.prevent="onPasswordChange")
      .form-field
        label(
          data-cy="label-new-password"
          for="new-password"
        ) Neues Passwort
        input#new-password(
          data-cy="new-password"
          type="text"
          name="new-password"
          autocomplete="new-password"
          required
          v-model.trim='v$.newPassword.$model'
          @blur="v$.newPassword.$validate()"
        )
        Transition(name="fade-fast" mode="out-in")
          template(v-if="v$.newPassword.$dirty && v$.newPassword.$invalid")
            Transition(name="fade-fast" mode="out-in")
              p.form-validation_error-message(data-cy="error-new-password-required" v-if="v$.newPassword.required.$invalid") Feld ist erforderlich.
              p.form-validation_error-message(data-cy="error-new-password-min" v-else-if="v$.newPassword.minLength.$invalid") Das Passwort muss min. {{ passwordMinLength }} Zeichen lang sein.

      .form-field
        label(
          data-cy="label-new-password-confirm"
          for="new-password-confirm"
        ) Passwort bestätigen
        input#new-password-confirm(
          data-cy="new-password-confirm"
          type="text"
          name="new-password-confirm"
          autocomplete="new-password-confirm"
          required
          v-model.trim='v$.newPasswordConfirm.$model'
          @blur="v$.newPasswordConfirm.$validate()"
        )
        Transition(name="fade-fast" mode="out-in")
          template(v-if="v$.newPasswordConfirm.$dirty && v$.newPasswordConfirm.$invalid")
            Transition(name="fade-fast" mode="out-in")
              p.form-validation_error-message(data-cy="error-new-password-required" v-if="v$.newPasswordConfirm.required.$invalid") Feld ist erforderlich.
              p.form-validation_error-message(data-cy="error-new-password-min" v-else-if="v$.newPasswordConfirm.sameAs.$invalid") Muss mit dem anderen Passwort übereinstimmen.

      .form-actions
        button.btn.btn_primary.btn_password-change(
          type="submit"
          :disabled="isLoading || v$.$invalid"
        ) Passwort ändern

  template(v-if="authStore.userIsAdmin")
    hr
    button.btn.btn_secondary.btn_admin-panel(
      data-cy="link-admin-panel"
      @click="goToAdminPanel"
    ) Zum Adminpanel
</template>

<style lang='scss' scoped>
@use '../styles/mixins' as *;

.user-profile-details {
  @include mq("t-l") {
    margin: 0 25%;
  }
}

.detail-infos {
  display: flex;
  flex-direction: column;
  gap: 2em;

  @include mq("t-p") {
    flex-direction: row;
    gap: 10em;
  }
}

.detail-info {
  font-size: 1.125em;
}

hr {
  opacity: 0.4;
}

.password-change {
  margin-top: 1.5em;
  max-width: 450px;
}

.btn_password-change,
.btn_admin-panel {
  width: 100%;

  @include mq("p-l") {
    width: max-content;
  }
}
</style>