//[problem] 不清楚为啥需要cjs，难道是Ts模块问题？
module.exports = {
  printWidth: 800, // 单行宽度限制
  tabWidth: 2, // tab 使用两个空格
  useTabs: false, // 不使用制表符缩进，使用空格缩进
  semi: true, // 代码需要分号结尾
  singleQuote: true, // 单引号
  bracketSpacing: true, // 对象左右两侧需要空格
  jsxBracketSameLine: true, // html 关闭标签换行
  arrowParens: 'avoid', // 单参数的箭头函数参数不需要括号
  proseWrap: 'never', // 换行,always：超过printWidth就换行，never：不换行，preserve：按照原样处理
  trailingComma: 'none' // 参考 https://prettier.io/docs/en/options.html#trailing-commas
};
