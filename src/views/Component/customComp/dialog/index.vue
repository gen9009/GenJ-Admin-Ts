<template>
  <div class="dialog-moudle">
    <div class="item">
    </div>
    <div class="item">
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.dialog-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 5px;
  height: 100%;
  padding: 10px;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 5px;
  }
}
</style>
