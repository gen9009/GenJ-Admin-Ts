<template>
  <el-container direction="horizontal">
    <NavTabs @switchNav="switchNav"></NavTabs>
    <Sider ref="sider" :menu="navTabsStore.menu"></Sider>
    <div></div>
  </el-container>
</template>

<script lang="ts" setup>
import NavTabs from './components/NavTabs.vue';
import Sider from './components/Sider.vue';
import { ComputedOptions, ref } from 'vue';
import { NavTabsStore } from '@/store/modules/NavTabsStore';
const navTabsStore = NavTabsStore();
const sider = ref<InstanceType<typeof Sider>>()
const switchNav = (menuNav: Menu.MenuNav) => {
  navTabsStore.switchMenu(menuNav.menu)
  //默认激活第一个菜单
  sider.value.activeMenu = menuNav.menu[0].path
  console.log(menuNav.menu[0].path,'激活的第一个菜单');
  
};
</script>

<style lang="scss">
@use './style.scss';
</style>
