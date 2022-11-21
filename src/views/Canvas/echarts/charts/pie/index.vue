<template>
  <div class="pie">
    <qi-echarts :option="pieOption"></qi-echarts>
  </div>
</template>
<script setup lang="ts">
import { pie } from './config.ts';
import { ref, reactive } from 'vue';
const pieOption = reactive(pie());
</script>
<style lang="scss" scoped>
.pie {
  width: 100%;
  height: 100%;
}
</style>
