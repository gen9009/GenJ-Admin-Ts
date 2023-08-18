/*
  自动判断节点是否 需要省略号，如果需要
  1、自动添加省略号
  2、自动添加tooltip (// 还未完成)

  判断省略号三种思路
  1、可以通过添加canvas，通过measure判断文本宽度
  2、添加div包裹文本获取宽度 与原本盒子宽度计算
*/

import { Directive, DirectiveBinding } from 'vue';
const ellipsisCss = {
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap'
};
const getPadding = (el: HTMLElement) => {
  const style = window.getComputedStyle(el, null);
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  return {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom
  };
};
const ellipsisFn = (el: HTMLElement, bind: DirectiveBinding) => {
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  let rangeWidth = range.getBoundingClientRect().width;
  // let rangeHeight = range.getBoundingClientRect().height;
  // const contentWidth = rangeWidth - Math.floor(rangeWidth);
  const { left, right } = getPadding(el);
  const horizontalPadding = left + right;
  if (rangeWidth + horizontalPadding > el.clientWidth) {
    //存在省略号
    const ellipsisString = Object.entries(ellipsisCss).reduce((pre, cur) => (pre += `${cur[0]}:${cur[1]};`), '');
    el.style.cssText += ellipsisString;
    console.log('🚀::::::🐶💩', bind);
  } else {
    //不存在省略号
  }
};
const ellipsis: Directive = {
  mounted(el: HTMLElement, bind: DirectiveBinding) {
    ellipsisFn(el, bind);
  },
  updated(el: HTMLElement, bind) {
    ellipsisFn(el, bind);
  },
  unmounted() {}
};
export default ellipsis;
