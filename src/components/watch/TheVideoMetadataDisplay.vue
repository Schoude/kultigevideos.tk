<script setup lang='ts'>
import { usePageHelpers } from '../../composables/page-helpers';
import { useVideoStore } from '../../stores/video';
import SvgIcon from '../gfx/icons/SvgIcon.vue';

const { getLocaleDateString } = usePageHelpers();
const videoStore = useVideoStore();
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
          button.count(title="Mag ich")
            SvgIcon.icon-like(icon-name="thumbs-up")
            span.counter(data-cy="counter-likes") 0
          button.count(title="Mag ich nicht")
            SvgIcon.icon.icon-dislike(icon-name="thumbs-down")
            span.counter(data-cy="counter-dislikes") 0
        .sentiment-bar
          .indicator(data-cy="indicator")
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
    width: 75%;
    position: absolute;
    left: 0;
  }
}
</style>