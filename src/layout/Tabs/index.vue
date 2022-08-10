<template>
  <div id="tab">
    <el-tabs v-model="clickTabsValue" type="card" class="demo-tabs" @tab-remove="removeTab">
      <el-tab-pane v-for="item in tabsList" :key="item.title" :closable="item.close" :label="item.title" :name="item.title"> </el-tab-pane>
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
import { TabPanelName } from 'element-plus';
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TabsStore } from '@/store/modules/TabsStore';
import { storeToRefs } from 'pinia';
import { useMask } from '@/hooks/useTabsMark';
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
// const router = useRouter();
const tabsStore = TabsStore();
const clickTabsValue = ref('');
const tabsList = storeToRefs(tabsStore).TabsList;
const { useTabsMask, ratio } = useMask();
const markUrl = `url('${useTabsMask()}')`;//蒙层图 url地址
const maskSizeX = ratio * 50 + '%'; //按分辨率缩放，放置蒙层
const maskSizeY = ratio * 100 + '%';//按分辨率缩放，放置蒙层

watch(
  () => route.path,
  path => {
    let param = {
      path: path,
      title: route.meta.title as string,
      close: true
    };
    tabsStore.addTabBtn(param);
    tabsStore.TabsCurrent = route.path;
  },
  {
    immediate: true
  }
);

const tabOptions = reactive<TabsOptions>({
  closeCurrent: tabsStore.removeSelectTabs,
  closeOther: tabsStore.removeOtherTabs,
  closeAll: tabsStore.removeAllTabs
});

//移除tabs
const removeTab = (targetName: TabPanelName): any => {
  tabsStore.removeSelectTabs(targetName as string);
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
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover) {
  mask: v-bind(markUrl);
  -webkit-mask: v-bind(markUrl);
  mask-size: 100% 100%;
  -webkit-mask-size: v-bind(maskSizeX) v-bind(maskSizeY);
  padding: 0 20px 0px;
  background-color: var(--el-color-primary-light-7);
  transition: all 0.2s ease;
}
</style>
