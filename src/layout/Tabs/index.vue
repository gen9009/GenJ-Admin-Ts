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
</style>
