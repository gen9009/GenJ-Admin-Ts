<template>
  <div class="slide-verify" :style="{ width: width + 'px' }" id="slideVerify" onselectstart="return false;">
    <!-- 图片加载遮蔽罩 -->
    <div :class="{ 'slider-verify-loading': loadBlock }"></div>
    <canvas :width="width" :height="height" ref="canvas"></canvas>
    <div v-if="show" @click="refresh" class="slide-verify-refresh-icon"></div>
    <canvas :width="width" :height="height" ref="block" class="slide-verify-block"></canvas>
    <!-- container -->
    <div
      class="slide-verify-slider"
      :class="{
        'container-active': containerState.active,
        'container-success': containerState.success,
        'container-fail': containerState.fail
      }"
    >
      <div class="slide-verify-slider-mask" :style="{ width: sliderMaskWidth }">
        <!-- slider -->
        <div @mousedown="sliderDown" @touchstart="touchStartEvent" @touchmove="touchMoveEvent" @touchend="touchEndEvent" class="slide-verify-slider-mask-item" :style="{ left: sliderLeft }">
          <div class="slide-verify-slider-mask-item-icon"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="SlideVerify">
import { onMounted, reactive, ref, Ref } from 'vue';
import { sum, square } from '@/utils/math';
import { useVerifyDraw } from './useDraw';
/*
  两种思路
  1、后端提供 `缺口图片`和`校验图` 两种图，前端通过canvas绘制拖拽移动 将移动距离传给后端进行验证

  2、前端自身抠图 通过canvas生成`缺口图片`和`校验图`，前端拖拽移动，自行判断

  目前第选择第二种
*/
export interface SlideVerifyProps {
  length?: number; // 缺口图片 长度
  radius?: number; // 缺口图片 圆角
  width?: number; // canvas 宽度
  height?: number; // canvas 高度
  sliderText?: string; // 滑动提示语
  accuracy?: number; // 若为 -1 则不进行机器判断
  show?: boolean;
  imgs?: [];
}
interface SlideVerifyEmits {
  (e: 'refresh', value?: any): void;
  (e: 'fulfilled', value?: any): void;
  (e: 'success', value?: any): void;
  (e: 'again', value?: any): void;
  (e: 'fail', value?: any): void;
}
const props = withDefaults(defineProps<SlideVerifyProps>(), {
  length: 40,
  radius: 10,
  width: 300,
  height: 155,
  sliderText: 'hahahah',
  accuracy: 5,
  show: true,
  imgs: () => []
});
const emits = defineEmits<SlideVerifyEmits>();

const block = ref<HTMLCanvasElement>(); // 缺口图canvas
const canvas = ref<HTMLCanvasElement>(); // 整体图canvas

const { blockX, loadBlock, resetDraw } = useVerifyDraw(block as Ref<HTMLCanvasElement>, canvas as Ref<HTMLCanvasElement>, props);

const containerState = reactive({
  active: false,
  success: false,
  fail: false
});
const originX = ref(0);
const originY = ref(0);
const isMouseDown = ref(false);
const trail = ref<number[]>([]);
const sliderLeft = ref();
const sliderMaskWidth = ref();
const success = ref(false);
const timestamp = ref(0);

const refresh = () => {
  reset();
  emits('refresh');
};

const reset = () => {
  success.value = false;

  containerState.active = false;
  containerState.success = false;
  containerState.fail = false;

  sliderLeft.value = 0;
  sliderMaskWidth.value = 0;

  resetDraw();
  emits('fulfilled');
};
const touchStartEvent = (e: TouchEvent) => {
  if (success.value) return;
  originX.value = e.changedTouches[0].pageX;
  originY.value = e.changedTouches[0].pageY;
  isMouseDown.value = true;
  timestamp.value = +new Date();
};
const touchMoveEvent = (e: TouchEvent) => {
  if (!isMouseDown.value) return false;
  const moveX = e.changedTouches[0].pageX - originX.value;
  const moveY = e.changedTouches[0].pageY - originY.value;
  if (moveX < 0 || moveX + 38 >= props.width) return false;
  sliderLeft.value = moveX + 'px';
  let blockLeft = ((props.width - 40 - 20) / (props.width - 40)) * moveX;
  block.value!.style.left = blockLeft + 'px';
  containerState.active = true;
  sliderMaskWidth.value = moveX + 'px';
  trail.value.push(moveY);
};
const touchEndEvent = (e: TouchEvent) => {
  if (!isMouseDown.value) return false;
  isMouseDown.value = false;
  if (e.changedTouches[0].pageX === originX.value) return false;
  containerState.active = false;
  timestamp.value = +new Date() - timestamp.value;
  const { spliced, TuringTest } = verify();
  if (spliced) {
    if (props.accuracy === -1) {
      containerState.success = true;
      success.value = true;
      emits('success', timestamp.value);
      return;
    }
    if (TuringTest) {
      // succ
      containerState.success = true;
      success.value = true;
      emits('success', timestamp);
    } else {
      containerState.fail = true;
      emits('again');
    }
  } else {
    containerState.fail = true;
    emits('fail');
    setTimeout(() => {
      reset();
    }, 1000);
  }
};

const bindEvents = () => {
  document.addEventListener('mousemove', e => {
    if (!isMouseDown.value) return false;
    const moveX = e.clientX - originX.value;
    const moveY = e.clientY - originY.value;
    if (moveX < 0 || moveX + 38 >= props.width) return false;
    sliderLeft.value = moveX + 'px';
    let blockLeft = ((props.width - 40 - 20) / (props.width - 40)) * moveX;
    block.value!.style.left = blockLeft + 'px';
    containerState.active = true; // add active
    sliderMaskWidth.value = moveX + 'px';
    trail.value.push(moveY);
  });
  document.addEventListener('mouseup', e => {
    if (!isMouseDown.value) return false;
    isMouseDown.value = false;
    if (e.clientX === originX.value) return false;
    containerState.active = false; // remove active
    timestamp.value = +new Date() - timestamp.value;
    const { spliced, TuringTest } = verify();
    if (spliced) {
      if (props.accuracy === -1) {
        containerState.success = true;
        success.value = true;
        emits('success', timestamp);
        return;
      }
      if (TuringTest) {
        // succ
        containerState.success = true;
        success.value = true;
        emits('success', timestamp);
      } else {
        containerState.fail = true;
        emits('again');
      }
    } else {
      containerState.fail = true;
      emits('fail');
      setTimeout(() => {
        reset();
      }, 1000);
    }
  });
};

const sliderDown = (event: MouseEvent) => {
  if (success.value) return;
  originX.value = event.clientX;
  originY.value = event.clientY;
  isMouseDown.value = true;
  timestamp.value = +new Date();
};

const verify = () => {
  const arr = trail.value; // drag y move distance
  const average = arr.reduce(sum) / arr.length; // average
  const deviations = arr.map(x => x - average); // deviation array
  const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
  const left = parseInt(block.value!.style.left);
  const accuracy = props.accuracy <= 1 ? 1 : props.accuracy > 10 ? 10 : props.accuracy;
  return {
    spliced: Math.abs(left - blockX.value) <= accuracy,
    TuringTest: average !== stddev // equal => not person operate
  };
};
onMounted(bindEvents);
</script>

<style scoped>
.slide-verify {
  position: relative;
}

/* 图片加载样式 */
.slider-verify-loading {
  position: absolute;
  inset: 0;
  z-index: 999;
  background: rgb(255 255 255 / 90%);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 9;
  }
}
.slide-verify-block {
  position: absolute;
  top: 0;
  left: 0;
}
.slide-verify-refresh-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-size: 34px 471px;
}
.slide-verify-slider {
  position: relative;
  width: 100%;
  height: 40px;
  margin-top: 15px;
  line-height: 40px;
  color: #45494c;
  text-align: center;
  background: #f7f9fa;
  border: 1px solid #e4e7eb;
}
.slide-verify-slider-mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 40px;
  background: #d1e9fe;
  border: 0 solid #1991fa;
}
.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 0 3px rgb(0 0 0 / 30%);
  transition: background 0.2s linear;
}
.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}
.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 -13px;
}
.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background-size: 34px 471px;
}
.container-active .slide-verify-slider-mask-item {
  top: -1px;
  height: 38px;
  border: 1px solid #1991fa;
}
.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}
.container-success .slide-verify-slider-mask-item {
  top: -1px;
  height: 38px;
  background-color: #52ccba !important;
  border: 1px solid #52ccba;
}
.container-success .slide-verify-slider-mask {
  height: 38px;
  background-color: #d2f4ef;
  border: 1px solid #52ccba;
}
.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}
.container-fail .slide-verify-slider-mask-item {
  top: -1px;
  height: 38px;
  background-color: #f57a7a !important;
  border: 1px solid #f57a7a;
}
.container-fail .slide-verify-slider-mask {
  height: 38px;
  background-color: #fce1e1;
  border: 1px solid #f57a7a;
}
.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}
.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
