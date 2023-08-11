<template>
  <div id="echarts-moudle">
    <QiCard width="100%" height="400px">
      <Pie></Pie>
    </QiCard>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import Pie from './pie/index.vue';
</script>
<style lang="scss" scoped>
#echarts-moudle {
  display: grid;
  padding: 10px;
}
</style>
