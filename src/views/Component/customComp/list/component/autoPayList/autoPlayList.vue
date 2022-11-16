<template>
  <!-- vue3-seamless-scroll 滚动插件 -->
  <!-- https://github.com/xfy520/vue3-seamless-scroll -->
  <div class="autoplay_list">
    <el-button class="control_btn" type="primary" @click="controlStop">控制滚动</el-button>
    <vue3-seamless-scroll :list="list" class="seamless-warp" v-model="isStop" :hover="true" :wheel="true" >
      <div class="list_item" v-for="item in list" :key="item">{{ item + 1 }}</div>
    </vue3-seamless-scroll>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const list = new Array(20).fill('').map((v, i) => i);
const isStop = ref(true);
const controlStop = () => {
  isStop.value = !isStop.value;
};
</script>
<style lang="scss" scoped>
.autoplay_list {
  height: 100%;
  .control_btn{
    height: 30px;
    margin-bottom: 10px;
  }
  .seamless-warp {
    height: calc(100% - 40px);
    overflow:hidden;
    .list_item {
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #fff;
      border: 1px dashed #eee;
    }
  }
}
</style>
