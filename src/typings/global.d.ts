declare namespace Menu {
  interface MenuNav {
    title: string; // 标题
    icon: string; //  router 图标
    active?:boolean;// 是否激活
    menu: MenuOptions[]; //router 路由
  }

  interface MenuOptions {
    path: string; //router 路径
    title: string; //router 标题
    close?: boolean; //菜单 关闭控制
    icon: string|undefined; //router 图标
    children?: MenuOptions[]; //router 路由
  }
}

declare namespace Theme {
  interface ThemeConfig {
    // isDark; //是否为暗黑模式 (vueUse)
    isDark: boolean; //是否为暗黑模式
    isGrey: boolean; //是否为灰色模式
    colorTheme: string; //自定义主题
    showFooter: boolean; //是否展示页脚
    showTabs: boolean; //是否展示标签栏
  }
}
