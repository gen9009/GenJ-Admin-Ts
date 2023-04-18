<template>
  <div id="table-moudle">
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
import TableDemo from './components/TableDemo.vue';
import SelectTreeTable from './components/SelectTreeTable.vue';
</script>
<style lang="scss" scoped>
#table-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(70%));
  grid-gap: 5px;
  min-height: 100%;
  padding: 10px;
  margin: auto;
  .item {
    height: 500px;
    padding: 10px;
    border: 1px solid #eeeeee;
  }
}
</style>
