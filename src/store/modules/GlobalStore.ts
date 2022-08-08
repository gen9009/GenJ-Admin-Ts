import { defineStore } from 'pinia';

/* 
  vueUse 暗黑模式
*/
// import { useDark } from '@vueuse/core';
// const isDark = useDark({
//   // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
//   storageKey: 'DarkTheme',
//   // 暗黑class名字
//   valueDark: 'dark',
//   // 高亮class名字
//   valueLight: 'light'
// });

export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => ({
    themeConfig: {
      // isDark: isDark, //是否为暗黑模式 (vueUse)
      isDark: false, //是否为暗黑模式
      isGrey: false, //是否为灰色模式
      colorTheme: '#409EFF', //默认主题颜色  自定义主题
      showFooter: true,
      showTabs: true
    } as Theme.ThemeConfig
  }),
  actions: {
    changeDark() {}
  },
  persist: true
});
