<script setup lang='ts'>
import { computed } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useUserStore } from '../../stores/user';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const authStore = useAuthStore();
const userStore = useUserStore();

const authUserIsProfileUser = computed(() => authStore.getUserId === userStore.getUserProfileData?._id)

const { createFormattedDurationStringFromSeconds, getLocaleDateString } = usePageHelpers();
</script>

<template lang='pug'>
section.user-videos
  h1.headline Videos ({{ userStore.getUserProfileData?.videos.length }})

  .videos-container(v-if="userStore.userHasVideos")
    article.video(v-for="video of userStore.getUserProfileData?.videos" :key="video._id")
      RouterLink.btn-thumbnail(:to="`/watch/${video.hash}`")
        span.duration-display {{ createFormattedDurationStringFromSeconds(video.meta.duration) }}
        img.thumb-img(
          :alt="`Vorschaubild für Video ${video.title}`"
          :src="video.thumb"
        )
      .info
        h2.title(data-cy="title")
          RouterLink(:to="`/watch/${video.hash}`") {{ video.title }}
        .metadata-line
          span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
          span.video-meta-block.upload-date(data-cy="upload-date") am {{ getLocaleDateString(video.uploadedAt) }}

      .status(v-if="authUserIsProfileUser")
        p.status__entry
          SvgIcon(
            :style="{ fill: video.approved ? 'green' : 'red' }"
            :icon-name="video.approved ? 'check' : 'times'"
            :aria-label="video.approved ? 'Video ist freigegeben.' : 'Video ist nicht freigegeben.'"
          )
          span freigegeben?
        p.status__entry
          SvgIcon(
            :style="{ fill: video.listed ? 'green' : 'red' }"
            :icon-name="video.listed ? 'check' : 'times'"
            :aria-label="video.approved ? 'Video ist gelistet.' : 'Video ist nicht gelistet.'"
          )
          span gelistet?

      .actions(v-if="userStore.userIsAuthUser")
        button.btn.btn_cancel(type="button") Video löschen
        button.btn.btn_secondary(type="button") Video editieren

  p.no-videos-fallback(v-else) Keine Videos vorhanden...!
</template>

<style lang='scss' scoped>
@use '../../styles/_mixins' as *;

.user-videos {
  margin-top: 2em;

  .headline {
    font-size: 24px;
    margin-bottom: 0.25em;
    margin-left: 8px;

    @include mq("t-l") {
      margin-left: 0;
    }
  }
}

.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  padding-bottom: 2em;

  @include mq("t-l") {
    justify-content: space-between;
  }
}

.video {
  width: 100%;
  margin-bottom: 0.5em;

  @include mq("t-p") {
    width: 320px;
  }
}

.btn-thumbnail {
  position: relative;
  display: inline-block;
  aspect-ratio: 16 / 9;
  width: 100%;
}

.thumb-img {
  width: 100%;
}

.info {
  padding-inline: 0.5em;

  @include mq("t-l") {
    padding-inline: 0;
  }
}

.status {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-block: 1em;
}

.status__entry {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title {
  font-weight: 500;
  font-size: 18px;
}

.viewcount {
  &:after {
    content: "•";
    margin: 0 4px;
  }
}

a {
  color: var(--color-text);
  text-decoration: none;
}

.metadata-line {
  a,
  .video-meta-block {
    opacity: 0.7;

    @media (prefers-color-scheme: light) {
      font-weight: 500;
    }
  }
}

.metadata-line {
  a {
    &:hover {
      opacity: 1;
    }
  }
}

.actions {
  margin-top: 0.25em;
  display: flex;
  justify-content: space-between;
  padding-inline: 0.5em;

  @include mq("t-l") {
    padding-inline: 0;
  }
}

.no-videos-fallback {
  text-align: center;
}
</style>