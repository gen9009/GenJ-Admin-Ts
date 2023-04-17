<template>
  <!-- 轮询播放 -->
  <div class="text-container">
    <div class="text-box">
      <div class="text-content">我是需要轮询的(比较多的)文字</div>
      <div class="text-content">我是需要轮询的(比较多的)文字</div>
    </div>
  </div>
  <div class="outher">
    <!-- 抽奖圆盘 -->
    <div class="wapper">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
    <!-- 抽奖按钮 -->
    <div ref="luckDraw" @click="drawTurnTable" class="cirle">抽奖</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const luckDraw = ref<HTMLElement>();
//抽奖点击事件
const drawTurnTable = () => {
  console.log(1);
};
//权重处理
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
