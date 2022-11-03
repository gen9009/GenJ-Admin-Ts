<template>
  <el-container direction="horizontal">
    <NavTabs @switchNav="switchNav"></NavTabs>
    <Sider :menu="navTabsStore.menu"></Sider>
    <div></div>
  </el-container>
</template>

<script lang="ts" setup>
import NavTabs from './components/NavTabs.vue';
import Sider from './components/Sider.vue';
import { NavTabsStore } from '@/store/modules/NavTabsStore';
const navTabsStore = NavTabsStore();
const switchNav = (menuNav: Menu.MenuNav) => {
  navTabsStore.switchMenu(menuNav.menu)
};
</script>

<style lang="scss">
@use './style.scss';
</style>
