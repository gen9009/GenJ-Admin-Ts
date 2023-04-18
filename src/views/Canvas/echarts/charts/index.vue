<template>
  <div id="echarts-moudle">
    <div class="item">
      <Pie></Pie>
    </div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import Pie from './pie/index.vue';
</script>
<style lang="scss" scoped>
#echarts-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);

  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  height: 100%;
  padding: 10px;
  margin: auto;
  background-color: #ffffff;
  .item {
    height: 300px;
    padding: 10px;
    border: 1px solid #eeeeee;
  }
}
</style>
