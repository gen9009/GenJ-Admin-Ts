<template>
  <div id="tab">
    <el-tabs v-model="clickTabsValue" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-click="gotoRoute">
      <el-tab-pane v-for="item in tabsList" :key="item.title" :closable="item.close" :label="item.title" :name="item.path">
        <template #label v-if="item.path === HOME_URL">
          <span class="custom-tabs-label">
            <span class="iconfont" :class="`icon-${item.icon}`" style="font-size: 18px; margin-right: 6px; vertical-align: bottom"></span>
            <span> {{ item.title }}</span>
          </span>
        </template>
      </el-tab-pane>
      <el-dropdown trigger="click" @command="doTabOption" size="small">
        <el-button size="small" type="primary" class="el-dropdown-link">更多<i-ep-arrow-down /></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="'closeCurrent'">关闭当前</el-dropdown-item>
            <el-dropdown-item :command="'closeOther'">关闭其他</el-dropdown-item>
            <el-dropdown-item :command="'closeAll'">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { TabPaneName } from 'element-plus';
import { reactive, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TabsStore } from '@/store/modules/TabsStore';
import { NavTabsStore } from '@/store/modules/NavTabsStore';
import { storeToRefs } from 'pinia';
import { useMask } from '@/hooks/useTabsMark';
import type { TabsPaneContext } from 'element-plus';
import { HOME_URL } from '@/config/config';
import NavTabs from '@/config/menuConfig/index';

interface TabsOptions {
  closeCurrent: Function;
  closeOther: Function;
  closeAll: Function;
}
/*
  1、监听路由,路由跳转添加Tab
  2、点击实现路由跳转
  3、默认首页展示
*/
const route = useRoute();
const router = useRouter();
const tabsStore = TabsStore();
const navTabsStore = NavTabsStore();
const clickTabsValue = computed({
  get: () => tabsStore.TabsCurrent,
  set: val => {
    //处理侧边栏展示
    tabsStore.TabsCurrent = val;
  }
});
const tabsList = storeToRefs(tabsStore).TabsList;
const { useTabsMask, ratio } = useMask();
const markUrl = `url('${useTabsMask()}')`; //蒙层图 url地址
const maskSizeX = ratio * 50 + '%'; //按分辨率缩放，放置蒙层
const maskSizeY = ratio * 100 + '%'; //按分辨率缩放，放置蒙层

const tabOptions = reactive<TabsOptions>({
  closeCurrent: tabsStore.removeCurrentTab,
  closeOther: tabsStore.removeOtherTabs,
  closeAll: tabsStore.removeAllTabs
});
//通过path获取navMenu
const findNavMenuIndex = (path: string): Menu.MenuNav => {
  let navMenu = {};
  for (let navIndex = 0; navIndex < NavTabs.length; navIndex++) {
    //第一步 获取menu
    NavTabs[navIndex].menu;
    // 第一层 比较path
    let menuList = NavTabs[navIndex].menu;
    for (let menuIndex = 0; menuIndex < menuList.length; menuIndex++) {
      if (menuList[menuIndex].path === path) {
        navMenu = NavTabs[navIndex];
        break;
      }
      if (menuList[menuIndex]?.children) {
        let childMenuList: Menu.MenuOptions[] = menuList[menuIndex].children as [];
        for (let childMenuIndex = 0; childMenuIndex < childMenuList.length; childMenuIndex++) {
          if (childMenuList[childMenuIndex].path === path) {
            navMenu = NavTabs[navIndex];
            break;
          }
        }
      }
    }
  }
  return navMenu as Menu.MenuNav;
};
//监听路由,路由跳转添加一个Tab,切换当前TabsCurrent
watch(
  () => route.path,
  path => {
    let param = {
      path: path,
      title: route.meta.title as string,
      close: true
    };
    tabsStore.addTabBtn(param);
    navTabsStore.switchMenu(findNavMenuIndex(path).menu);
    navTabsStore.switchNav(findNavMenuIndex(path));
    tabsStore.TabsCurrent = route.path;
  },
  {
    immediate: true
  }
);

const gotoRoute = (tab: TabsPaneContext) => {
  console.log(tab, 'tabs');

  let path = tab.props.name as string;
  router.push(path);
};

//移除tabs
const removeTab = (tabPath: TabPaneName): any => {
  tabsStore.removeSelectTabs(tabPath as string);
};

const doTabOption = (commandInfo: string) => {
  tabOptions[commandInfo as keyof typeof tabOptions]();
};
</script>
<style lang="scss" scoped>
@use 'style.scss';
//Tab active 样式
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  mask: v-bind(markUrl);
  -webkit-mask: v-bind(markUrl);
  mask-size: 100% 100%;
  -webkit-mask-size: v-bind(maskSizeX) v-bind(maskSizeY);
  background-color: var(--el-color-primary-light-9);
  transition: all 0.2s ease;
}
//Tab hover 样式
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item:hover) {
  mask: v-bind(markUrl);
  -webkit-mask: v-bind(markUrl);
  mask-size: 100% 100%;
  -webkit-mask-size: v-bind(maskSizeX) v-bind(maskSizeY);
  padding: 0 20px 0px;
  background-color: var(--el-color-primary-light-7);
  transition: all 0.2s ease;
}
</style>
