import { computed } from 'vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
export const useTheme = () => {
  const globalStore = GlobalStore();
  const themeConfig = computed(() => globalStore.themeConfig);
  /* 
    切换暗黑主题
    1、基于Element暗黑主题思路, 在<html>标签添加 类名dark
    2、自定义dark主题 + element内置 dark主题
  */
  const useDark = () => {
    //返回文档对象（document）的根元素的只读属性（如 HTML 文档的 <html> 元素）
    const html = document.documentElement as HTMLElement;
    themeConfig.value.isDark ? html?.setAttribute('class', 'dark') : html?.removeAttribute('class');
  };
  return {
    useDark
  };
};
