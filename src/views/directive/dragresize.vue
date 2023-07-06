<template>
  <div id="dragresize">
    <div class="left" v-dragResize.right></div>
    <div class="right" v-dragResize></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
#dragresize {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    position: relative;
    width: 50%;
    height: 300px;
    background-color: #cccccc;
  }
  .left::after {
    position: absolute;
    bottom: 0;
    left: 100%;
    width: max-content;
    height: 100px;
    content: '⬆️';
    transform: translate(-50%, 100%);
  }
  .right {
    width: 50%;
    height: 300px;
    background-color: #666666;
  }
}
</style>
