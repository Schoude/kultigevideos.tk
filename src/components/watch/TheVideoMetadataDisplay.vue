<script setup lang='ts'>
import { ref, computed } from 'vue';
import { usePageHelpers } from '../../composables/page-helpers';
import { useAuthStore } from '../../stores/auth';
import { useVideoStore } from '../../stores/video';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const { getLocaleDateString } = usePageHelpers();
const videoStore = useVideoStore();
const authStore = useAuthStore();

const sentimentLoading = ref(false);
const getSentimentWidth = computed(() => {
  if (videoStore.currentVideo?.likes.length === 0 && videoStore.currentVideo?.dislikes.length === 0) {
    return '50%';
  } else {
    const totalVotes = (videoStore.currentVideo?.likes.length as number) + (videoStore.currentVideo?.dislikes.length as number);
    return `${Math.round((videoStore.currentVideo?.likes.length as number) / totalVotes * 100)}%`
  }
});
const getIconLike = computed(() => videoStore.currentVideo?.likes.includes(authStore.user?._id as string)
  ? 'thumbs-up-solid' : 'thumbs-up');
const getIconDislike = computed(() => videoStore.currentVideo?.dislikes.includes(authStore.user?._id as string)
  ? 'thumbs-down-solid' : 'thumbs-down');

async function likeVideo() {
  if (sentimentLoading.value) return;
  sentimentLoading.value = true;
  await videoStore.likeVideo();
  sentimentLoading.value = false;
}

async function dislikeVideo() {
  if (sentimentLoading.value) return;
  sentimentLoading.value = true;
  await videoStore.dislikeVideo();
  sentimentLoading.value = false;
}
</script>

<template lang='pug'>
.the-video-metadata-display
  h1.video-title(data-cy="video-title" :title="videoStore.currentVideo?.title") {{ videoStore.currentVideo?.title }}
  .statistics
    .text
      span.video-meta-block.viewcount(data-cy="viewcount") {{ videoStore.currentVideo?.viewCount }} Aufrufe
      span.video-meta-block.upload-date(data-cy="upload-date") {{ getLocaleDateString(videoStore.currentVideo?.uploadedAt) }}
    .interactions
      .sentiment
        .counts
          button.count(data-cy="btn-like" title="Mag ich" @click="likeVideo")
            SvgIcon.icon-like(:icon-name="getIconLike")
            span.counter(data-cy="counter-likes") {{ videoStore.currentVideo?.likes.length }}
          button.count(data-cy="btn-dislike" title="Mag ich nicht" @click="dislikeVideo")
            SvgIcon.icon.icon-dislike(:icon-name="getIconDislike")
            span.counter(data-cy="counter-dislikes") {{ videoStore.currentVideo?.dislikes.length }}
        .sentiment-bar
          .indicator(
            data-cy="indicator"
            :style="{ width: getSentimentWidth }"
          )
</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

.video-title {
  font-size: 1.125em;
  font-weight: 500;
  margin: 0.75em 0 0.75em 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include mq("t-p") {
    margin: 1em 0 0.5em 0;
    white-space: revert;
    overflow: revert;
    text-overflow: revert;
  }
}

.statistics {
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @include mq("p-m") {
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.viewcount {
  &:after {
    content: "•";
    margin: 0 4px;
  }
}

.video-meta-block {
  opacity: 0.7;

  @media (prefers-color-scheme: light) {
    font-weight: 500;
  }
}

.interactions {
  height: 40px;

  @include mq("desktop") {
    align-self: flex-end;
  }
}

.sentiment {
  max-width: fit-content;
}

.counts,
.count {
  display: flex;
  align-items: center;
}

.counts {
  gap: 2em;
  padding: 0 0.5em;
}

.count {
  cursor: pointer;
  padding: 0;

  @media (prefers-color-scheme: light) {
    svg {
      fill: black;
    }
  }
}

.counter {
  margin-left: 1em;
}

.sentiment-bar {
  margin-top: 0.5em;
  height: 3px;
  width: 100%;
  background-color: red;
  position: relative;

  .indicator {
    height: inherit;
    background-color: green;
    position: absolute;
    left: 0;
  }
}
</style>