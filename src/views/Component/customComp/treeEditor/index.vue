<template>
  <div class="treeEditor-moudle">
    <QiCard style="overflow: auto" height="100%" width="100%">
      <Comp1 default-expand-all v-model="treeData"></Comp1>
    </QiCard>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Comp1, { Tree } from './comp1/comp1.vue';
const treeData = ref<Tree[]>([
  {
    id: 1,
    level: 1,
    label: '爷爷👴',
    children: [
      {
        id: 4,
        level: 2,
        label: '爸爸👨',
        children: [
          {
            id: 9,
            level: 3,
            label: '99年儿子👦'
          },
          {
            id: 10,
            level: 3,
            label: '93年儿子👦'
          }
        ]
      }
    ]
  }
]);
</script>
<style lang="scss" scoped>
.treeEditor-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
