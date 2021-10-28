<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { usePageHelpers } from '../../composables/page-helpers';
import { ROUTE_NAMES } from '../../router/routing-info';
import type { Video } from '../../types/models/video';

const router = useRouter();
const { getLocaleDateString } = usePageHelpers();

const props = defineProps<{ video: Video }>()

function onCardClick() {
  router.push({ name: ROUTE_NAMES.WATCH, params: { hash: props.video.hash } })
}

</script>

<template lang='pug'>
article.video-feed-entry
  button.btn-thumbnail(@click="onCardClick")
    img.thumbnail(data-cy="thumbnail" :src="video.thumb" :alt="`video thumbnail for video ${video.title}`")

  .metadata
    .avatar-box
      RouterLink.uploader-link(:to="`/profile/${video.uploader._id}`")
        img.avatar(:src="video.uploader.meta.avatarUrl" :alt="`avatar picture of user ${video.uploader.username}`")

    .info
      h3.title(data-cy="title")
        RouterLink(:to="`/watch/${video.hash}`") {{ video.title }}
      .metadata-line.uploader(data-cy="uploader-name")
        RouterLink.uploader-link(:to="`/profile/${video.uploader._id}`") {{ video.uploader.username }}
      .metadata-line
        span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
        span.video-meta-block.upload-date(data-cy="upload-date") am {{ getLocaleDateString(video.uploadedAt) }}

</template>

<style lang='scss' scoped>
.btn-thumbnail {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.thumbnail {
  position: absolute;
  inset: 0;
  aspect-ratio: 16/9;
  cursor: pointer;
}

.metadata {
  display: flex;
  margin-top: 0.5em;
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