<template>
  <div class="nav_tabs">
    <div class="nav_tabs_header flex-jac">
      <img src="@/assets/images/avatar.png" alt="" />
    </div>
    <div class="nav_tabs_content flex-ac flex-col">
      <div :class="{ active: item.active }" class="nav_tabs_item" v-for="(item, index) in navTabsList" :key="index" @click="switchNav(item)">
        <div class="nav_tabs_title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { NavTabsStore} from '@/store/modules/NavTabsStore.ts'
const emit = defineEmits(['switchNav']);
const navTabsStore = NavTabsStore()
//点击Tabs 跳转router
const navTabsList = reactive(navTabsStore.navTabsList);
const switchNav = (menuNav: Menu.MenuNav) => {
  navTabsStore.switchNav(menuNav)
  emit('switchNav', menuNav);
};
</script>
<style lang="scss" scoped></style>
