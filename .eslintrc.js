module.exports = {
  root: true,
  env: {
    //指定代码的运行环境
    browser: true,
    node: true
  },
  //定义ESLint的解析器
  parser: '@typescript-eslint/parser',
  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'], //定义文件继承的子规范
  plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  rules: {
    /*
     * "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
		"@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
