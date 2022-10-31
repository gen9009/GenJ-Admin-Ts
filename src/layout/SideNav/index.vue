<template>
  <el-container direction="horizontal">
    <NavTabs @switchNav="switchNav"></NavTabs>
    <Sider :menuList="menuList"></Sider>
    <div></div>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NavTabs from './components/NavTabs.vue';
import Sider from './components/Sider.vue';
let menuList = ref<Menu.MenuOptions[]>([]); //当前Tab菜单
const switchNav = (menuNav: Menu.MenuNav) => {
  menuList.value = menuNav.menu;
};
</script>

<style lang="scss">
@use './style.scss';
</style>
