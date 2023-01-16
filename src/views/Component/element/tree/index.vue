<template>
  <div id="tree_moudle">
    <div class="item">
      <scrollTree></scrollTree>
    </div>
    <div class="item">
    </div>
    <div class="item">
    </div>
    <div class="item">
    </div>
  </div>
</template>
<script setup lang="ts">
import scrollTree from './component/scrollTree/scrollTree.vue'

</script>
<style lang="scss" scoped>
#tree_moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill,300px);
  grid-gap: 5px;
  height: 100%;
  margin: auto;
  padding: 10px;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>
