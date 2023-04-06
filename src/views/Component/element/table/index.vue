<template>
<div id="table_moudle">
  <div class="item">
    <TsTableCompDemo></TsTableCompDemo>
  </div>
  <div class="item">
    <SelectTreeTable></SelectTreeTable>
  </div>
  <div class="item">
    <SelectTreeTable></SelectTreeTable>
  </div>
  <div class="item">
    <SelectTreeTable></SelectTreeTable>
  </div>
</div>
</template>
<script setup lang="ts">
import TsTableCompDemo from './components/TsTableCompDemo.vue'
import SelectTreeTable from './components/SelectTreeTable.vue'
</script>
<style lang="scss" scoped>
#table_moudle{
  padding: 10px;
  display: grid;
  min-height: 100%;
  grid-template-columns:  repeat(auto-fill,calc(100%));
  grid-gap: 5px;
  margin: auto;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
