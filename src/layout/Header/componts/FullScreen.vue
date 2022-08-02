<template>
  <el-tooltip content="全屏展示">
    <span class="iconfont" :class="isFullscreen ? 'icon-tuichuquanping' : 'icon-quanping'" @click="toggle"></span>
  </el-tooltip>
</template>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
const { toggle, isFullscreen } = useFullscreen();
</script>
<style lang="scss" scoped></style>
