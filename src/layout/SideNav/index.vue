<template>
  <el-menu :default-active="activeMenu" :collapse-transition="false" :unique-opened="true" :router="true" background-color="#191a20" active-color="#fff" class="el-menu-vertical-demo" text-color="#fff" @open="handleOpen" @close="handleClose">
    <SiderItem :siderList="siderList"></SiderItem>
  </el-menu>
</template>

<script lang="ts" setup>
import siderList from '@/config/SiderNavList.json';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import SiderItem from './components/SiderItem.vue';

//默认激活的菜单
const route = useRoute();
const activeMenu = computed((): string => route.path);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleOpen');
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleClose');
};
</script>

<style scoped lang="scss">
@use 'style.scss';
</style>
