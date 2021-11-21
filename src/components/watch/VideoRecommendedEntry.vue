<script setup lang='ts'>
import { usePageHelpers } from '../../composables/page-helpers';
import type { Video } from '../../types/models/video';

defineProps<{ video: Video }>()

const { getLocaleDateString, createFormattedDurationStringFromSeconds } = usePageHelpers();
</script>

<template lang='pug'>
article.video-recommended-entry
  RouterLink.thumb-container(:to="`/watch/${video.hash}`")
    span.duration-display {{ createFormattedDurationStringFromSeconds(video.meta.duration) }}
    img.thumb(
      :alt="`Vorschaubild für Video ${video.title}`"
      :src="video.thumb"
    )
  .meta-data
    RouterLink.video-title(:to="`/watch/${video.hash}`") {{ video.title }}

    .metadata-line
      RouterLink.video-uploader(:to="`/profile/${video.uploader?._id}`") {{ video.uploader?.username }}

    .metadata-line
      span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
      span.video-meta-block.upload-date(data-cy="upload-date") am {{ getLocaleDateString(video.uploadedAt) }}
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.video-recommended-entry {
  display: flex;
  gap: 0.5em;
  flex-direction: column;
  max-width: 550px;

  @include mq("t-l") {
    flex-direction: row;
  }

  & + & {
    margin-top: 1em;
  }
}

.thumb-container {
  aspect-ratio: 16 /9;
  flex: 0 0 170px;
  position: relative;
}

.thumb {
  width: 100%;
}

.meta-data {
  display: flex;
  flex-direction: column;

  a {
    color: var(--color-text);
    text-decoration: none;
  }

  .video-title {
    font-weight: 500;
  }
}

.viewcount {
  &:after {
    content: "•";
    margin: 0 4px;
  }
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
</style>