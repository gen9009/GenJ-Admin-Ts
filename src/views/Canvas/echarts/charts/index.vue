<template>
  <div id="echarts_moudle">
    <div class="item">
      <Pie></Pie>
    </div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import Pie from './pie/index.vue';
import { ref, reactive } from 'vue';
</script>
<style lang="scss" scoped>
#echarts_moudle {
  background-color: #fff;
  padding: 10px;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  margin: auto;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
