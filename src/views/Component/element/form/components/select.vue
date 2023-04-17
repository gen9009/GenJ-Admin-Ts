<template>
  <header></header>
  <aside></aside>
  <nav></nav>
  <progress value="90" max="100"></progress>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const input = ref('');
</script>
<style lang="scss" scoped>
.text {
  font-size: 12px;
}
</style>
