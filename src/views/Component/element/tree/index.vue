<template>
  <div id="tree-moudle">
    <div class="item">
      <scrollTree></scrollTree>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import scrollTree from './component/scrollTree/scrollTree.vue';
</script>
<style lang="scss" scoped>
#tree-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 5px;
  min-height: 100%;
  padding: 10px;
  margin: auto;
  .item {
    height: 300px;
    padding: 10px;
    border: 1px solid #eeeeee;
  }
}
</style>
