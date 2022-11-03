import { defineStore } from 'pinia';
import { HomeMenu } from '@/config/menuConfig/HomeMenu';
import NavTabs from '@/config/menuConfig/index';

export const NavTabsStore = defineStore({
  id: 'NavTabsStore',
  state: () => ({
    //存放当前NavTabs
    navTabsList: NavTabs,
    menu: HomeMenu
  }),
  actions: {
    //切换side
    switchMenu(menuList:any) {
      this.menu = menuList;
    },
    //切换Nav
    switchNav(menuNav: Menu.MenuNav) {
      this.navTabsList.forEach(v => {
        v.active = menuNav.title == v.title ? true : false;
      });
    }
  },
  persist: true
});
