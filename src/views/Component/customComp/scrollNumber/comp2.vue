<template>
  <count-up1 :start-val="0" :end-val="2022" :duration="4" :autoplay="false" @init="onInit"></count-up1>
  <br />
  <div><ElButton type="primary" @click="start">开始</ElButton><ElButton type="primary" @click="reset">重置</ElButton><ElButton type="primary" @click="stop">暂停/启动</ElButton></div>
  <br />
  <count-up1 :end-val="num" :duration="1" :decimalPlaces="5" :useEasing="false"></count-up1>
  <br />
  <div><ElButton type="primary" @click="stopRequestAnimationFrame">暂停 requestAnimationFrame</ElButton></div>
</template>
<script setup lang="ts">
/*
数字滚动 vue2插件 https://github.com/PanJiaChen/vue-countTo
数字滚动 vue3+ts插件 https://github.com/jizai1125/vue-countup-v3

就是想用下 requestAnimationFrame 虽然没必要👊🏻
*/

import { onMounted, ref, Ref } from 'vue';
import type { ICountUp } from 'vue-countup-v3';
import CountUp1 from 'vue-countup-v3';
let countUp: ICountUp | undefined;
const num = ref<number>(1000);
const canelAnimationId = ref<number>();
const onInit = (ctx: ICountUp) => {
  countUp = ctx;
};
const refreshNum = (num: Ref<number>): void => {
  num.value = num.value + 0.000001;
  canelAnimationId.value = requestAnimationFrame(() => refreshNum(num));
};

const start = () => {
  countUp?.start();
};
const reset = () => {
  countUp?.reset();
};
const stop = () => {
  countUp?.pauseResume();
};

const stopRequestAnimationFrame = () => {
  cancelAnimationFrame(canelAnimationId.value!); // 有延时 因为要加上 组件duration
};
onMounted(() => refreshNum(num));
</script>
<style lang="scss" scoped></style>
