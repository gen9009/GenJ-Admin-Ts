<template>
  <el-tooltip content="主题切换">
    <span class="iconfont icon-pifu" @click="drawer = true"></span>
  </el-tooltip>
  <el-drawer v-model="drawer" title="布局设置">
    <!-- 全局主题 -->
    <div class="globe_theme">
      <div class="globe_title title">
        <el-divider>全局主题</el-divider>
      </div>
      <div class="globe_options">
        <el-switch v-model="menuStore.isCollapse" inactive-text="折叠面板" />
        <el-switch v-model="menuStore.isCollapse" inactive-text="折叠面板" />
        <el-switch v-model="menuStore.isCollapse" inactive-text="折叠面板" />
      </div>
    </div>
    <!-- 界面设置 -->
    <div class="web_theme">
      <div class="web_title title">
        <el-divider>界面主题</el-divider>
      </div>
      <div class="web_options">
        <el-switch v-model="menuStore.isCollapse" inactive-text="折叠面板" />
        <el-switch v-model="webTheme.showTabs" inactive-text="标签栏" />
        <el-switch v-model="webTheme.showFooter" inactive-text="页脚" />
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
import { MenuStore } from '@/store/modules/MenuStore';
const globalStore = GlobalStore();
const menuStore = MenuStore();
const webTheme = computed(() => globalStore.webTheme);
const drawer = ref<boolean>(false);
</script>
<style lang="scss" scoped>
@use '../style.scss';
</style>
