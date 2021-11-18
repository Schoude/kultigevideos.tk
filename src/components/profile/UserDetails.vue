<script setup lang='ts'>
import { computed } from '@vue/reactivity';
import { usePageHelpers } from '../../composables/page-helpers';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
const { createFormattedDurationStringFromSeconds } = usePageHelpers();

const getTotalDurationString = computed(() => {
  const time = createFormattedDurationStringFromSeconds(userStore.getUserProfileData?.totalVideoDuration as number);

  return userStore.getUserProfileData?.totalVideoDuration as number > 3600
    ? `${time} Stunden`
    : `${time} Minuten`;
});
</script>

<template lang='pug'>
section.user-details
  article.user
    img.avatar(
      :alt="`Avatar pictur of ${userStore.getUserProfileData?.username}`"
      :src="userStore.getUserProfileData?.meta.avatarUrl"
    )
    h1.headline {{ userStore.getUserProfileData?.username }}

  article.user-performance
    h2.headline Performance
    section.performance-data
      p.total-views Anzahl Aufrufe: <br> {{ userStore.getUserProfileData?.totalViewcount }}
      p.total-duration Laufzeit der hochgeladenen Videos: <br> {{ getTotalDurationString }}
      p.total-likes Anzahl Likes: <br> {{ userStore.getUserProfileData?.totalLikes }}
      p.total-dislikes Anzahl Dislikes: <br> {{ userStore.getUserProfileData?.totalDislikes }}

</template>

<style lang='scss' scoped>
@use '../../styles/mixins' as *;

article {
  border-bottom: 1px solid var(--border-color-container);
  padding-bottom: 2em;

  & + & {
    margin-top: 2em;
  }
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
}

.headline {
  font-size: 24px;
}

.user {
  .headline {
    font-size: 26px;
    margin-left: 2em;
  }
}

.user-performance {
  .headline {
    margin-bottom: 0.25em;
  }
}

.performance-data {
  display: grid;
  row-gap: 1em;

  @include mq("t-p") {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>