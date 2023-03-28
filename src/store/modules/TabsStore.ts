import { defineStore } from 'pinia';
import { HOME_URL, TABS_BLACK } from '@/config/config';
import router from '@/routers/index';

export const TabsStore = defineStore({
  id: 'TabsStore',
  state: () => ({
    TabsCurrent: HOME_URL, //存放当前Tab path
    TabsList: [{ title: '首页', path: HOME_URL, close: false, icon: 'shouye' }] as Menu.MenuOptions[] //Tabs展示列表
  }),
  actions: {
    //删除全部Tabs
    removeAllTabs() {
      this.TabsList.splice(1);
      router.push(HOME_URL);
    },
    //删除当前Tab
    removeCurrentTab() {
      if(this.TabsCurrent == HOME_URL)return;
      let tabIndex = this.TabsList.findIndex(v => v.path === this.TabsCurrent);
      let nextPath = tabIndex === this.TabsList.length - 1 ? this.TabsList[tabIndex - 1].path : this.TabsList[tabIndex + 1].path;
      router.push(nextPath);
      this.TabsList.splice(tabIndex, 1);
    },
    //删除其他Tabs
    removeOtherTabs() {
      this.TabsList = this.TabsList.filter(v => [HOME_URL, this.TabsCurrent].includes(v.path));
      router.push(this.TabsCurrent);
    },
    //删除选中Tab(string) or 删除当前Tab(undefined)
    removeSelectTabs(tabPath: string | undefined) {
      let tabIndex: number; //应删除tab的索引
      let nextPath: string; // 删除后应跳转的path
      tabIndex = this.TabsList.findIndex(v => v.path === tabPath);
      //删除tabPath 并非当前TabsCurrent 直接跳过路由push
      if (tabPath === this.TabsCurrent) {
        nextPath = tabIndex === this.TabsList.length - 1 ? this.TabsList[tabIndex - 1].path : this.TabsList[tabIndex + 1].path;
        router.push(nextPath);
      }
      this.TabsList.splice(tabIndex, 1);
    },
    addTabBtn(tab: Menu.MenuOptions) {
      //过滤掉已存在和黑名单
      if (TABS_BLACK.find((v:any) => v === tab.path)) return;
      if (this.TabsList.find((v:any) => v.path === tab.path)) return;
      this.TabsList.push(tab);
    }
  },
  persist: true
});
