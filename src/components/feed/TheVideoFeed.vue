<script setup lang='ts'>
import { ref } from 'vue';
import { apiClient } from '../../api';
import { Video } from '../../types/models/video';

const videos = ref<null | Video[]>(null)

apiClient
</script>

<template lang='pug'>
section.the-video-feed
</template>

<style lang='scss' scoped>
</style>