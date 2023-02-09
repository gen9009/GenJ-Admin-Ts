import { GlobalStore } from '@/store/modules/GlobalStore.ts';
import { computed } from 'vue';
import { mix } from '@/utils/themeFn.ts';
/* 
模仿 https://vue-admin-beautiful.com/admin-plus/#/index tabs效果 🥺不确定人家通过啥方式实现
发现人家用的css mask，奈何自己没有mask图片，就采用canvs绘制mask

注意 
1、canvas绘制图片会模糊,采用(2X图)定义图片,但是发现2倍也会模糊🥺
2、[problem] 目前就不考虑优化了 (canvas绘制图片大小会随分辨率而改变)
*/

export const useMask = () => {
  const globalStore = GlobalStore();
  const themeConfig = computed(() => globalStore.themeConfig);
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  // canvas.style.backgroundColor = 'transparent';
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let getPixelRatio = (context: any) => {
    let backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  let ratio = getPixelRatio(ctx) < 2 ? 2 : getPixelRatio(ctx);
  const useTabsMask = (width: number = 260, height: number = 160, bottom: number = 30, top: number = 30) => {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.beginPath();
    ctx.translate(width, height);
    ctx.moveTo(-width, 0); //起始点
    ctx.lineTo(width, 0);
    ctx.quadraticCurveTo(width - bottom, 0, width - bottom, -bottom);
    ctx.lineTo(width - bottom, -height + top);
    ctx.quadraticCurveTo(width - bottom, -height, width - bottom - top, -height);
    ctx.lineTo(-width + bottom + top, -height);
    ctx.quadraticCurveTo(-width + bottom, -height, -width + bottom, -height + bottom);
    ctx.lineTo(-width + bottom, -bottom);
    ctx.quadraticCurveTo(-width + bottom, 0, -width, 0);
    // ctx.lineWidth = 0.5;
    // ctx.strokeStyle = `${themeConfig.value.colorTheme}`;
    // ctx.stroke();
    // ctx.fillStyle = 'transparent';
    // ctx.fillStyle = `${themeConfig.value.colorTheme}`;
    ctx.fillStyle = mix(themeConfig.value.colorTheme, 0.8) as string;
    ctx.fill();
    ctx.closePath(); //闭合路径
    const bgImg = canvas.toDataURL('image/png');
    return bgImg;
  };
  return {
    ratio,
    useTabsMask
  };
};
