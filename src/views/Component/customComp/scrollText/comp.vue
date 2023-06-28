<template>
  <div class="text-container">
    <div class="text-box">
      <div class="text-content">我是需要轮询的(比较多的)文字</div>
      <div class="text-content">我是需要轮询的(比较多的)文字</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.text-container {
  position: relative;
  width: 100%;
  height: 20px;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  border: 1px solid #cccccc;
  .text-box {
    position: absolute;
    display: flex;
    width: 200%;
    animation: move 5s linear infinite;
    .text-content {
      width: 100%;
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}
</style>
