import { defineStore } from 'pinia';
import { HOME_URL, TABS_BLACK } from '@/config/config';
import router from '@/routers/index';

export const TabsStore = defineStore({
  id: 'TabsStore',
  state: () => ({
    TabsCurrent: HOME_URL, //存放当前Tab path
    TabsList: [{ title: '首页', path: HOME_URL, close: false }] as Menu.MenuOptions[] //Tabs展示列表
  }),
  actions: {
    //删除全部Tabs
    removeAllTabs() {
      this.TabsList.splice(1);
      router.push(HOME_URL);
    },
    //删除选中Tab or 删除当前Tab
    removeSelectTabs(tabTitle: string | undefined) {
      let tab: Menu.MenuOptions | undefined; //选中Tab或者当前tab
      let tabIndex: number; //应删除tab的索引
      let nextPath: string; // 删除后应跳转的path
      if (tabTitle === undefined) {
        tab = this.TabsList.find(v => v.path === this.TabsCurrent);
      } else {
        tab = this.TabsList.find(v => v.title === tabTitle);
      }
      tabIndex = this.TabsList.findIndex(v => v.path === tab?.path);
      if (!(this.TabsList.length - 1)) return; //如果只存在首页 阻断操作
      nextPath = tabIndex === this.TabsList.length - 1 ? this.TabsList[tabIndex - 1].path : this.TabsList[tabIndex + 1].path;
      router.push(nextPath);
      console.log(tabIndex, this.TabsList, this.TabsCurrent, '123');
      this.TabsList.splice(tabIndex, 1);
    },
    //删除其他Tabs
    removeOtherTabs() {
      this.TabsList = this.TabsList.filter(v => [HOME_URL, this.TabsCurrent].includes(v.path));
      router.push(this.TabsCurrent);
    },
    addTabBtn(tab: Menu.MenuOptions) {
      //过滤掉已存在和黑名单
      if (TABS_BLACK.find(v => v === tab.path)) return;
      if (this.TabsList.find(v => v.path === tab.path)) return;
      this.TabsList.push(tab);
    }
  }
});
