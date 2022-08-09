import { defineStore } from 'pinia';

export const MenuStore = defineStore({
  id: 'MenuStore',
  state: () => ({
    isCollapse: false //默认不折叠
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  persist: {
    key: 'MenuStore', //保存的 key
    storage: window.localStorage, //保存方式 sessionStorage
    beforeRestore: context => {
      console.log('Before hydration...', context);
    },
    afterRestore: context => {
      console.log('After hydration...', context);
    }
  }
});
