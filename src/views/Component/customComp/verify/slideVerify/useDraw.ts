import { computed, onMounted, ref, Ref } from 'vue';
import { SlideVerifyProps } from './slideVerify.vue';
import { PI } from '@/utils/math';
type DrawOption = Required<SlideVerifyProps>;

const getRandomImg = (imgs = []) => {
  const len = imgs.length;
  return len > 0 ? imgs[getRandomNumberByRange(0, len)] : 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 1084);
};
const getRandomNumberByRange = (start: number, end: number) => {
  return Math.round(Math.random() * (end - start) + start);
};
const draw = (ctx: CanvasRenderingContext2D, x: number, y: number, length: number, radius: number, operation) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + length / 2, y - radius + 2, radius, 0.72 * PI, 2.26 * PI);
  ctx.lineTo(x + length, y);
  ctx.arc(x + length + radius - 2, y + length / 2, radius, 1.21 * PI, 2.78 * PI);
  ctx.lineTo(x + length, y + length);
  ctx.lineTo(x, y + length);
  ctx.arc(x + radius - 2, y + length / 2, radius + 0.4, 2.76 * PI, 1.24 * PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx[operation]();
  // Bug Fixes 修复了火狐和ie显示问题
  ctx.globalCompositeOperation = 'destination-over';
};

export const useVerifyDraw = (block: Ref<HTMLCanvasElement>, canvas: Ref<HTMLCanvasElement>, drawOption: DrawOption) => {
  const blockCtx = ref();
  const canvasCtx = ref();
  const blockX = ref<number>(0);
  const blockY = ref<number>(0);
  const img = ref();
  const loadBlock = ref(true); // 蒙板加载情况
  const L = computed(() => drawOption.length + drawOption.radius * 2 + 3);
  onMounted(() => {
    img.value = createImg(imgLoad);
    blockCtx.value = block.value.getContext('2d');
    canvasCtx.value = canvas.value.getContext('2d');
  });
  const createImg = (onload: (this: GlobalEventHandlers, ev: Event) => any) => {
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.onload = onload;
    img.onerror = () => {
      img.src = getRandomImg(drawOption.imgs);
    };
    img.src = getRandomImg(drawOption.imgs);
    return img;
  };
  const imgLoad = () => {
    // 图片加载完关闭遮蔽罩
    loadBlock.value = false;
    blockX.value = getRandomNumberByRange(L.value + 10, drawOption.width - (L.value + 10));
    blockY.value = getRandomNumberByRange(10 + drawOption.radius * 2, drawOption.height - (L.value + 10));
    // 绘制线条
    draw(canvasCtx.value, blockX.value, blockY.value, drawOption.length, drawOption.radius, 'fill');
    draw(blockCtx.value, blockX.value, blockY.value, drawOption.length, drawOption.radius, 'clip');
    // 填充图片
    canvasCtx.value.drawImage(img.value, 0, 0, drawOption.width, drawOption.height);
    blockCtx.value.drawImage(img.value, 0, 0, drawOption.width, drawOption.height);

    let x = blockX.value;
    let y = blockY.value;
    let _y = y - drawOption.radius * 2 - 1;
    /* 
      1、获取 L正方形 图形信息
      2、随后将 块 宽度缩至 随机图
      3、
    */
    let ImageData = blockCtx.value.getImageData(x, _y, L.value, L.value);
    block.value.width = L.value;
    blockCtx.value.putImageData(ImageData, 0, _y);
  };
  const resetDraw = () => {
    let { width, height } = drawOption;
    block.value!.style.left = '0px';
    block.value!.width = drawOption.width;
    canvasCtx.value.clearRect(0, 0, width, height);
    blockCtx.value.clearRect(0, 0, width, height);
    img.value.src = getRandomImg();
  };

  return {
    blockCtx,
    canvasCtx,
    img,
    blockX,
    blockY,
    loadBlock,
    resetDraw
  };
};
