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
  }
});
