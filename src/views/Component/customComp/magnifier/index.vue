<template>
  <div class="magnifier-moudle">
    <QiCard width="300px" height="300px">
      <Comp1></Comp1>
    </QiCard>
  </div>
</template>
<script setup lang="ts">
import Comp1 from './component/comp1.vue';
</script>
<style lang="scss" scoped>
.magnifier-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
