<template>
  <div id="tree-moudle">
    <div class="item">
      <ElButton type="primary" @click="openDia">普通测试</ElButton>
      <QiDialog :diaLoading="diaLoading" v-model="dialogVisible" @closeDia="closeDia"> 1 </QiDialog>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from '@/hooks/useDialog';

const { dialogVisible, closeDia, diaLoading, openDia } = useDialog();
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    padding: 10px;
    border: 1px solid #eeeeee;
  }
}
</style>
