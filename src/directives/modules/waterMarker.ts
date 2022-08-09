/* 
思路
1、使用canvas 生成 base64 格式的图片文件 设置其字体大小，颜色等。
2、 将其设置为背景图片

使用
<div v-watermark="{text:'版权所有'，textColor:'rgba(...)'}"></div>
*/

import type { Directive, DirectiveBinding } from 'vue';

const addWaterMark: Directive = (text: string, parentNode: any, font: any, textColor: string) => {
  let canvas: HTMLCanvasElement = document.createElement('canvas');
  parentNode.appendChild(canvas);
  canvas.width = 200;
  canvas.height = 150;
  canvas.style.display = 'none';
  let cvs = canvas.getContext('2d') as CanvasRenderingContext2D;
  cvs.rotate((-20 * Math.PI) / 180);
  cvs.font = font || '30px Microsoft JhengHei';
  cvs.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  cvs.textAlign = 'left';
  cvs.textBaseline = 'Middle' as CanvasTextBaseline;
  cvs.fillText(text, canvas.width / 10, canvas.height / 2);
  parentNode.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
};

const waterMarker = {
  created(el: DirectiveBinding, bind: DirectiveBinding) {
    // console.log(bind.instance?.$route, 'bind'); //获取路由信息
    addWaterMark(bind.value.text, el, bind.value.font, bind.value.textColor);
  }
};

export default waterMarker;
