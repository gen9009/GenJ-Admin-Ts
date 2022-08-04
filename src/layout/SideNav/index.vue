<template>
  <div class="menu" :style="{ width: isCollapse ? '64px' : '200px' }">
    <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true" :router="true" background-color="#191a20" active-color="#0a0a0a" class="el-menu-vertical-demo" text-color="#fff" @open="handleOpen" @close="handleClose">
      <SiderItem :siderList="siderList"></SiderItem>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import siderList from '@/config/SiderNavList.json';
import { useRoute } from 'vue-router';
import { MenuStore } from '@/store/modules/MenuStore';
import { computed } from 'vue';
import SiderItem from './components/SiderItem.vue';

//默认激活的菜单
const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => menuStore.isCollapse);
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
