<template>
  <div class="menu" :style="{ width: isCollapse ? '64px' : '170px' }">
    <div class="menu-header flex-jac" v-show="!isCollapse">GenJ-Admin</div>
    <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true" :router="true"  class="el-menu-vertical-demo" :text-color="isDark?'#fff':'#000'" @close="handleClose">
      <SiderItem :siderList="menu"></SiderItem>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
// import siderList from '@/config/SiderNavList.json';
import SiderItem from './SiderItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuStore } from '@/store/modules/MenuStore';
import { GlobalStore } from '@/store/modules/GlobalStore';
import { computed } from 'vue';
//获取 当前Tab 指定菜单
const props = defineProps(['menu']);
const route = useRoute();
const router = useRouter();
const menuStore = MenuStore();
const globalStore = GlobalStore()
const isCollapse = computed((): boolean => menuStore.isCollapse); //折叠状态
const isDark = computed(()=>globalStore.themeConfig.isDark)
//激活的菜单路由
let activeMenu = computed({
  get() {
    return route.path;
  },
  set(value:string) {
    router.push({ path: value });
  }
});
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleClose');
};
defineExpose({
  activeMenu
});
</script>

<style scoped lang="scss"></style>
