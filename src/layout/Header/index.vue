<template>
  <div class="header">
    <!-- Left Logo -->
    <Logo :isCollapse="menuStore.isCollapse" />
    <!-- Right 折叠 组件大小 中英翻译 换肤 全屏 账号切换-->
    <div class="comp">
      <div class="comp-collapse">
        <div class="collapse-controller" @click="menuStore.changeCollapse()">
          <i-ep-expand v-if="menuStore.isCollapse"></i-ep-expand>
          <i-ep-fold v-else></i-ep-fold>
        </div>
      </div>
      <div class="comp-options">
        <div class="comp-size">
          <CompSize></CompSize>
        </div>
        <div class="language">
          <Language></Language>
        </div>
        <div class="color-theme">
          <Theme></Theme>
        </div>
        <div class="full-screen">
          <FullScreen></FullScreen>
        </div>
        <div class="user-change">
          <UseImg></UseImg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './componts/Logo.vue';
import CompSize from './componts/CompSize.vue';
import Theme from './componts/Theme.vue';
import Language from './componts/Language.vue';
import UseImg from './componts/UserImg.vue';
import FullScreen from './componts/FullScreen.vue';
import { MenuStore } from '@/store/modules/MenuStore';
const menuStore = MenuStore();
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
