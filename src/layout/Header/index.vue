<template>
  <div class="header">
    <!-- Left Logo -->
    <Logo :isCollapse="menuStore.isCollapse" />
    <!-- Right 折叠 组件大小 中英翻译 换肤 全屏 账号切换-->
    <div class="comp">
      <el-row class="row-bg" justify="space-between">
        <el-col :span="1">
          <div class="collapse_controller" @click="menuStore.changeCollapse()">
            <i-ep-expand v-if="menuStore.isCollapse"></i-ep-expand>
            <i-ep-fold v-else></i-ep-fold>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="comp_size">
            <CompSize></CompSize>
          </div>
          <div class="language">
            <Language></Language>
          </div>
          <div class="color_theme">
            <ColorTheme></ColorTheme>
          </div>
          <div class="full_screen">
            <FullScreen></FullScreen>
          </div>
          <div class="user_change">
            <UseImg></UseImg>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './componts/Logo.vue';
import CompSize from './componts/CompSize.vue';
import ColorTheme from './componts/ColorTheme.vue';
import Language from './componts/Language.vue';
import UseImg from './componts/UserImg.vue';
import FullScreen from './componts/FullScreen.vue';
import { MenuStore } from '@/store/modules/MenuStore';
const menuStore = MenuStore();
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
