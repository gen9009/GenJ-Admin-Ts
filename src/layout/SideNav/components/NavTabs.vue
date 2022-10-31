<template>
  <div class="nav_tabs">
    <div class="nav_tabs_header flex-jac">
      <img src="@/assets/images/avatar.png" alt="" />
    </div>
    <div class="nav_tabs_content flex-ac flex-col">
      <div :class="{ active: item.active }" class="nav_tabs_item" v-for="(item, index) in navTabs" :key="index" @click="switchNav(item)">
        <div class="nav_tabs_title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import NavTabs from '@/config/menuConfig/index';
import { reactive } from 'vue';
const emit = defineEmits(['switchNav']);
//点击Tabs 跳转router
const navTabs = reactive(NavTabs);
const switchNav = (menuNav: Menu.MenuNav) => {
  navTabs.forEach(v => {
    v.active = menuNav.title == v.title ? true : false;
  });
  emit('switchNav', menuNav);
};
</script>
<style lang="scss" scoped></style>
