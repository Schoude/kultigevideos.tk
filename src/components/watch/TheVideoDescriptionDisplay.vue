<script setup lang='ts'>
import { ref } from 'vue';
import { useVideoStore } from '../../stores/video';

const videoStore = useVideoStore();
const showMore = ref(false);

function onTriggerShowMore() {
  showMore.value = !showMore.value;
}
</script>

<template lang='pug'>
.the-video-description-display
  .uploader
    .avatar-box
      RouterLink.uploader-link(:to="`/profile/${videoStore.currentVideo?.uploader?._id}`")
        img.avatar(
          :src="videoStore.currentVideo?.uploader?.meta.avatarUrl"
          :alt="`avatar picture of user ${videoStore.currentVideo?.uploader?.username}`"
          data-cy="avatar"
        )
    h3.title
      RouterLink(:to="`/profile/${videoStore.currentVideo?.uploader?._id}`") {{ videoStore.currentVideo?.uploader?.username }}
  .description-container
    .description-text(
      :class="{ 'open': showMore }"
      data-cy="description-text"
    ) {{ videoStore.currentVideo?.description === '' ? "Keine Beschreibung vorhanden" : videoStore.currentVideo?.description }}
    button.more-button(
      @click="onTriggerShowMore"
      data-cy="more-button"
    ) {{ showMore ? 'WENIGER ANZEIGEN' : 'MEHR ANSEHEN' }}
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.the-video-description-display {
  margin-top: 1em;
  padding-bottom: 1em;
  margin-bottom: 2em;
  border-bottom: 1px solid var(--border-color-container);
}

.uploader {
  display: flex;
  gap: 1em;
}

.avatar {
  width: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.title {
  margin-bottom: 0.5em;
  margin-top: 0.25em;
}

a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
}

.description-container {
  margin-left: 4em;
}

.description-text {
  max-height: 3em;
  overflow: hidden;

  @include mq("t-p") {
    max-width: 75%;
  }

  @include mq("laptop") {
    max-width: 50%;
  }

  &.open {
    min-height: 100px;
    max-height: revert;
    overflow: visible;
  }
}
</style>