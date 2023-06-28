<template>
  <div id="dialog-moudle">
    <QiCard><ElButton type="primary" @click="openDia">普通测试</ElButton> <QiDialog :diaLoading="diaLoading" v-model="dialogVisible" @closeDia="closeDia"> 1 </QiDialog></QiCard>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import { useDialog } from '@/hooks/useDialog';

const { dialogVisible, closeDia, diaLoading, openDia } = useDialog();
</script>
<style lang="scss" scoped>
#dialog-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
