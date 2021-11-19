<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
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
        h3.title(data-cy="title")
          RouterLink(:to="`/watch/${video.hash}`") {{ video.title }}
        .metadata-line
          span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
          span.video-meta-block.upload-date(data-cy="upload-date") am {{ getLocaleDateString(video.uploadedAt) }}

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
  width: 320px;
  margin-bottom: 0.5em;
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

.title {
  font-weight: 500;
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
}

.no-videos-fallback {
  text-align: center;
}
</style>