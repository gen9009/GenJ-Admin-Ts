<template>
  <div class="logo" :style="{ width: isCollapse ? '64px' : '200px' }">
    <img src="@/assets/vue.svg" alt="" draggable="false" />
    <span class="title" v-if="!isCollapse">GenJ-Admin</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>
<style lang="scss" scoped>
@use '../style.scss';
</style>
