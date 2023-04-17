/* 
  一个在页面加载Loading的指令

*/

import { Directive, DirectiveBinding, createApp } from 'vue';
import Loading from '@/components/QiLoading/index.vue';
const appendElementSibling = (el: HTMLElement, bind: DirectiveBinding) => {
  /* 
    'beforebegin': 在el的前面.
    'afterbegin':只在el当中, 在el第一个子孩子前面.
    'beforeend':只在el当中, 在el最后一个子孩子后面.
    'afterend': 在el的后面.
    */
  console.log('🚀::::::🐶', Loading, '123');
  const loading = createApp(Loading).mount(document.createElement('div')).$el;
  bind.value && el.insertAdjacentElement('afterend', loading);
};
const qiLoading: Directive = {
  mounted(el: HTMLElement, bind: DirectiveBinding) {
    console.log('🚀::::::🐶', el, bind, 'mounted');
    appendElementSibling(el, bind);
  },
  // nextElementSibling 返回指定元素之后的下一个兄弟元素（相同节点树层中的下一个元素节点）。
  updated(el, bind: DirectiveBinding) {
    console.log('🚀::::::🐶', el, 'updated');
    if (bind.oldValue !== bind.value) {
      //需要更新
      const loading = el.nextElementSibling;
      loading && loading.remove();
      appendElementSibling(el, bind);
    }
  },
  unmounted(el) {
    console.log('🚀::::::🐶', el, 'unmounted');
    const loading = el.nextElementSibling;
    loading && loading.remove();
  }
};
export default qiLoading;
