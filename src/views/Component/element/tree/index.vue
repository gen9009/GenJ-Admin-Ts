<template>
  <div id="tree-moudle">
    <QiCard><scrollTree></scrollTree></QiCard>
  </div>
</template>
<script setup lang="ts">
import scrollTree from './component/scrollTree/scrollTree.vue';
</script>
<style lang="scss" scoped>
#tree-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
