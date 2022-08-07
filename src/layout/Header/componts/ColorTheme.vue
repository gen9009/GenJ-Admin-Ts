<template>
  <el-tooltip content="主题切换">
    <span class="iconfont icon-pifu" @click="showDraw"></span>
  </el-tooltip>
  <el-drawer v-model="drawer" title="布局设置">
    <!-- 全局主题 -->
    1231231
    <div class="globe_theme">
      <ul>
        <li>
          <span>主题颜色</span>
          <span>哈哈</span>
        </li>
        <li><span>暗色模式</span> <span>哈哈</span></li>
        <li><span>灰色模式</span> <span>哈哈</span></li>
      </ul>
    </div>
    <!-- 界面设置 -->
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const drawer = ref<boolean>(false);
const showDraw = (): void => {
  drawer.value = true;
};
</script>
<style lang="scss" scoped>
@use '../style.scss';
</style>
