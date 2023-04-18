<template>
  <div class="nav-tabs">
    <div class="nav-tabs-header flex-jac">
      <img src="@/assets/images/avatar.png" alt="" />
    </div>
    <div class="nav-tabs-content flex-ac flex-col">
      <div :class="{ active: item.active }" class="nav-tabs-item" v-for="(item, index) in navTabsList" :key="index" @click="switchNav(item)">
        <div class="nav-tabs-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { NavTabsStore } from '@/store/modules/NavTabsStore';
const emit = defineEmits(['switchNav']);
const navTabsStore = NavTabsStore();
//点击Tabs 跳转router
const navTabsList = reactive(navTabsStore.navTabsList);
const switchNav = (menuNav: Menu.MenuNav) => {
  navTabsStore.switchNav(menuNav);
  emit('switchNav', menuNav);
};
</script>
<style lang="scss" scoped></style>
