<template>
  <div class="list-moudle">
    <div class="item">
      <virtualList></virtualList>
    </div>
    <div class="item">
      <autoPlayList></autoPlayList>
    </div>
  </div>

  <div class="infinite-list-container">
    <div class="infinite-list-phantom"></div>
    <div class="infinite-list">
      <!-- item-1 -->
      <!-- item-2 -->
      <!-- ...... -->
      <!-- item-n -->
    </div>
  </div>
</template>
<script setup lang="ts">
import virtualList from './component/virtualList/virtualList.vue';
import autoPlayList from './component/autoPayList/autoPlayList.vue';
</script>
<style lang="scss" scoped>
.list-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 5px;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  .item {
    height: 300px;
    border: 1px solid #eee;
    padding: 5px;
  }
}
</style>
