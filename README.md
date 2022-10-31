
# GenJ-Admin-Ts

  自我折腾的后端管理项目模版

# 项目菜单配置说明

```text
项目目前未对接后端，仅为学习使用，所以菜单需手动配置
├── src
│   ├── config
│   │   └── menuConfig
│   │       ├── CompMenu.ts
│   │       ├── HomeMenu.ts
│   │       ├── LinkMenu.ts
│   │       └── index.ts

在src路径下中的menuConfig文件 配置路径

```

# 命令说明
  
  npm run preview --- 打包成线上模式  

  npm run dev --- 打包成开发模式  

# 目录结构

```text
.
├── README.md
├── auto-imports.d.ts
├── components.d.ts
├── index.html
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── config
│   │   ├── config.ts
│   │   └── menuConfig
│   ├── directives
│   │   ├── index.ts
│   │   └── modules
│   ├── hooks
│   ├── layout
│   │   ├── Footer
│   │   ├── Header
│   │   ├── SideNav
│   │   ├── Tabs
│   ├── main.ts
│   ├── mock
│   ├── routers
│   ├── store
│   ├── styles
│   ├── typings
│   ├── utils
│   ├── views
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

# commit

```text
格式: [type]:[subject]

type:
  init - 初始化
  1、feat - 新功能 feature
  2、fix - 修复 bug
  3、docs - 文档注释
  4、style - 代码格式(不影响代码运行的变动)
  5、refactor - 重构、优化(既不增加新功能，也不是修复bug)
  6、perf - 性能优化
  7、test - 增加测试
  8、chore - 构建过程或辅助工具的变动
  9、revert - 回退
 10、 build - 打包
```

# 注释提示

```
[problem]:  存在的问题尚未修改

```
