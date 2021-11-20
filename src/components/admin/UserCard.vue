<script setup lang='ts'>
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import type { User, UserRole } from '../../types/models/user';
import KvRadioButton from '../forms/elements/KvRadioButton.vue';
import LoaderIndeterminate from '../gfx/loaders/LoaderIndeterminate.vue';

const props = defineProps<{ user: User }>();
const emit = defineEmits(['updated:userRole']);

const userStore = useUserStore();
const updatedRole = ref<UserRole>(props.user.role);
const isLoading = ref(false);

async function onUpdateUserRoleClick() {
  isLoading.value = true;
  await userStore.updateUserRole(props.user._id, updatedRole.value);
  emit('updated:userRole');
  isLoading.value = false;
}
</script>

<template lang='pug'>
article.user-card
  LoaderIndeterminate(:class="{ visible: isLoading }")
  section.user-meta
    RouterLink.user-meta(:to='`/profile/${props.user._id}`')
      img.avatar(:alt="`Avatar von ${props.user.username}`" :src="props.user.meta.avatarUrl")
      .user-name {{ props.user.username }}

  section.user-info
    p.user-mail {{ props.user.email }}
    p.user-role  {{ props.user.role }}

  section.user-info.user-role-edit
    .radios
      KvRadioButton(:name='`maintainer-${props.user._id}`', value='maintainer', v-model="updatedRole") Maintainer
      KvRadioButton(:name='`user-${props.user._id}`', value='user', v-model="updatedRole") User
    button.btn.btn_secondary(
      type="submit"
      :disabled="isLoading"
      @click="onUpdateUserRoleClick"
      ) Benutzer editieren
</template>

<style lang='scss' scoped>
.user-card {
  position: relative;
  background-color: var(--color-ui);
  padding: 1em;
  min-width: 320px;
}

.user-meta {
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.avatar {
  width: 60px;
}

.user-name {
  margin-left: 1em;
  font-weight: 500;
  font-size: 20px;
}

.user-info {
  margin-top: 1em;
}

.user-role-edit {
  display: flex;
  flex-direction: column;

  .radios {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-around;
  }
}
</style>