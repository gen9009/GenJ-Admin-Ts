declare namespace Menu {
  interface MenuOptions {
    path: string; //router 路径
    title: string; //router 标题
    close?: boolean; //菜单 关闭控制
    icon?: string; //router 图标
    children?: MenuOptions[]; //router 字路由
  }
}

declare namespace Theme {
  interface WebTheme {
    showFooter: boolean; //是否展示页脚
    showTabs: boolean; //是否展示标签栏
  }
  interface ColorTheme {
    isDark:boolean //是否为暗黑模式
  }
}
