<template>
  <div class="scrollNumber-moudle">
    <QiCard class="flex-jac flex-col">
      🎰
      <Comp1 ref="comp1" v-model="num"></Comp1>
      <ElButton type="primary" @click="changeNumber">更改数据</ElButton>
    </QiCard>
    <QiCard class="flex-jac flex-col">
      <Comp2></Comp2>
    </QiCard>
    <QiCard>
      <div class="flex-jac flex-col"></div>
    </QiCard>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Comp1 from './comp1.vue';
import Comp2 from './comp2.vue';
const comp1 = ref();
const num = ref<number | string>('0000');
const changeNumber = () => {
  num.value = new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  comp1.value.refresh();
};
</script>
<style lang="scss" scoped>
.scrollNumber-moudle {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
