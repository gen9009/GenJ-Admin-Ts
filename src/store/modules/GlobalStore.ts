import { defineStore } from 'pinia';

export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => ({
    colorTheme: {},
    webTheme: {
      showFooter: true,
      showTabs: true
    } as Theme.WebTheme
  }),
  actions: {}
});
