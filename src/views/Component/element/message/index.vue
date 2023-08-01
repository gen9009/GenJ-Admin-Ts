<template>
  <div id="dialog-moudle">
    <QiCard><ElButton type="primary" @click="openMessage('success')">单例成功测试</ElButton><ElButton type="primary" @click="openMessage('info')">单例失败测试</ElButton></QiCard>
  </div>
</template>
<script setup lang="ts">
import message from '@/utils/singleMessage';
import { messageType } from 'element-plus';
const openMessage = (type: messageType) => message[type]('123');
</script>
<style lang="scss" scoped>
#dialog-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
