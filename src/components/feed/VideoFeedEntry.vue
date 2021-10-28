<script setup lang='ts'>
import type { Video } from '../../types/models/video';

defineProps<{ video: Video }>()
</script>

<template lang='pug'>
article.video-feed-entry
  img.thumbnail(data-cy="thumbnail" :src="video.thumb")

  .metadata
    img.avatar(:src="video.uploader.meta.avatarUrl")

    .info
      h3.title(data-cy="title")
        RouterLink(:to="`/watch/${video.hash}`") {{ video.title }}
      .metadata-line.uploader(data-cy="uploader-name")
        RouterLink(:to="`/profile/${video.uploader._id}`") {{ video.uploader.username }}      
      .metadata-line
        span.video-meta-block.viewcount(data-cy="viewcount") {{ video.viewCount }} Aufrufe
        span.video-meta-block.upload-date(data-cy="upload-date") am {{ video.uploadedAt?.toLocaleDateString() }}

</template>

<style lang='scss' scoped>
.thumbnail {
  aspect-ratio: 16 / 9;
}

.metadata {
  display: flex;
}

.avatar {
  display: inline;
  width: 2.25em;
  height: 2.25em;
  border-radius: 50%;
  overflow: hidden;
}

.title {
  font-weight: 500;
}

.viewcount {
  &:after {
    content: "•";
    margin: 0 4 px;
  }
}
</style>