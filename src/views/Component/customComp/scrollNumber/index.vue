<template>
  <div class="scrollNumber-moudle">
    <QiCard>
      <Comp1 v-model="num"></Comp1>
      <ElButton type="primary" @click="changeNumber">更改数据</ElButton>
    </QiCard>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Comp1 from './comp1.vue';
const num = ref<number | string>('0000');
const changeNumber = () => {
  num.value = new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join('');
};
</script>
<style lang="scss" scoped>
.scrollNumber-number {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
