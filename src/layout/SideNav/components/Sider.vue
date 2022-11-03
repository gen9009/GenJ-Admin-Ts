<template>
  <div class="menu" :style="{ width: isCollapse ? '64px' : '170px' }">
    <div class="menu-header flex-jac" v-show="!isCollapse">GenJ-Admin</div>
    <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true" :router="true" background-color="#fff" class="el-menu-vertical-demo" text-color="#000" @close="handleClose">
      <SiderItem :siderList="menu"></SiderItem>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
// import siderList from '@/config/SiderNavList.json';
import SiderItem from './SiderItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuStore } from '@/store/modules/MenuStore';
import { computed, watch } from 'vue';
//获取 当前Tab 指定菜单
const props = defineProps(['menu']);

const route = useRoute();
const router = useRouter();
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse); //折叠状态
//激活的菜单路由
let activeMenu = computed({
  get() {
    return route.path;
  },
  set(value) {
    router.push({ path: value });
  }
});
//默认激活第一个菜单 (监听menuList)
watch(
  () => props.menu,
  newValue => {
    activeMenu.value = newValue[0].path;
  }
);
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, 'handleClose');
};
</script>

<style scoped lang="scss"></style>
