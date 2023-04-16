<template>
<div id="table_moudle">
  <div class="item">
    <TableDemo></TableDemo>
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
import TableDemo from './components/TableDemo.vue'
import SelectTreeTable from './components/SelectTreeTable.vue'
</script>
<style lang="scss" scoped>
#table_moudle{
  padding: 10px;
  display: grid;
  min-height: 100%;
  grid-template-columns:  repeat(auto-fill,calc(70%));
  grid-gap: 5px;
  margin: auto;
  .item {
    height: 500px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
