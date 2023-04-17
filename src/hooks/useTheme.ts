import { computed, onBeforeMount } from 'vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
import { ElMessage } from 'element-plus';
import { mix } from '@/utils/themeFn';
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

  /* 
    切换Element主题颜色
    1、全局替换 Element主题颜色变量 
    2、由于Element自身主题是颜色渐变，所以自定义渐变函数 更改其他样式
  */
  const useElementTheme = (val: string | null) => {
    if (!val) {
      val = '#409EFF';
      ElMessage('this is a message.');
    }
    themeConfig.value.colorTheme = val;
    //按钮的active的color变量
    document.documentElement.style.setProperty('--el-color-primary-dark-2', mix(themeConfig.value.colorTheme, 0.2, '#000000') as string);
    //全局primary颜色变量
    document.documentElement.style.setProperty('--el-color-primary', themeConfig.value.colorTheme);
    //全局按primary渐变的颜色变量
    for (let i = 1; i < 10; i++) {
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, mix(themeConfig.value.colorTheme, i * 0.1) as string);
    }
  };
  /* 
    切换灰色主题
  */
  const useGrey = () => {};

  // 在挂载之前判断
  onBeforeMount(() => {
    //1、判断暗黑模式
    useElementTheme(themeConfig.value.colorTheme);
    if (themeConfig.value.isDark) useDark();
    if (themeConfig.value.isGrey) useGrey();
  });
  return {
    useElementTheme,
    useDark,
    useGrey
  };
};
