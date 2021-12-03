<script setup lang='ts'>
import { usePageHelpers } from '../../composables/page-helpers';
import type { Video } from '../../types/models/video';

const { getLocaleDateString, createFormattedDurationStringFromSeconds } = usePageHelpers();

defineProps<{ video: Video }>()

</script>

<template lang='pug'>
article.video-feed-entry
  RouterLink.btn-thumbnail(:to="`/watch/${video.hash}`")
    span.duration-display {{ createFormattedDurationStringFromSeconds(video.meta.duration) }}
    img.thumbnail(data-cy="thumbnail" :src="video.thumb" :alt="`video thumbnail for video ${video.title}`")

  .metadata
    .avatar-box
      RouterLink.uploader-link(:to="`/profile/${video.uploader?._id}`")
        img.avatar(:src="video.uploader?.meta.avatarUrl" :alt="`avatar picture of user ${video.uploader?.username}`")

    .info
      h3.title(data-cy="title" :title="video.title")
        RouterLink(:to="`/watch/${video.hash}`") {{ video.title }}
      .metadata-line.uploader(data-cy="uploader-name")
        RouterLink.uploader-link(:to="`/profile/${video.uploader?._id}`") {{ video.uploader?.username }}
      .metadata-line
        span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
        span.video-meta-block.upload-date(data-cy="upload-date") am {{ getLocaleDateString(video.uploadedAt) }}

</template>

<style lang='scss' scoped>
@use '../../styles/mixins.scss' as *;

.btn-thumbnail {
  display: inline-block;
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
}

.thumbnail {
  cursor: pointer;
  width: 100%;
}

.duration-display {
  margin: 8px;
}

.metadata {
  display: flex;
  margin: 0.5em 0.5em 0 0.5em;
  gap: 0.5em;

  @include mq("t-p") {
    margin: 0.5em 0 0 0;
  }
}

.avatar-box {
  flex-shrink: 0;
  flex-basis: 38px;
}

.avatar {
  display: inline;
  width: 2.25em;
  height: 2.25em;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75em;
}

.title {
  font-weight: 500;

  @include line-clamp();
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
</style>