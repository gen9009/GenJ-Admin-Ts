<template>
  <div class="turnTable-moudle">
    <div class="item">
      <TurnTable1></TurnTable1>
    </div>
    <div class="item">
      <TurnTable1></TurnTable1>
    </div>
  </div>
</template>
<script setup lang="ts">
import TurnTable1 from './component/turnTable1/turnTable1.vue';
</script>
<style lang="scss" scoped>
.turnTable-moudle {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 5px;
  height: 100%;
  padding: 10px;
  background-color: #ffffff;
  .item {
    height: 300px;
    padding: 5px;
    border: 1px solid #eeeeee;
  }
}
</style>
