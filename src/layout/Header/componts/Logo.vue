<template>
  <div class="logo">
    <!-- <img src="@/assets/vue.svg" alt="" draggable="false" /> -->
    <span class="title" v-if="!isCollapse"></span>
  </div>
</template>
<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>
<style lang="scss" scoped>
@use '../style.scss';
</style>
