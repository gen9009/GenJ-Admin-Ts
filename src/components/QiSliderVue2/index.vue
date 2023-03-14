<template>
  <div class="slider-main" ref="slider" @click="mainClick($event)">
    <slider-button ref="button" v-model="firstValue"></slider-button>
    <div class="slider-bar" :style='{ "width": barSize}'></div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount,provide,watch } from 'vue';
import SliderButton from './button.vue';
// 一个简易的滑块组件
/*
仿照 ELementUI Vue2思路
结构搭建
    1、主体结构
    2、左侧Bar高亮结构
    3、按钮Button滑块结构
滑动逻辑
    1、鼠标接触滑块  触发hover效果
    1、鼠标点击滑块  触发 mousedown
    3、鼠标移动滑块  触发 mouseMove
    4、鼠标放开触发  触发 mouseup
*/
const props = defineProps({
  value: {
    type: [Number],
    default: 0
  },
  min: {
    type:Number ,
    default:0,
  },
  max: {
    type:Number ,
    default:100,
  },
});
provide('min',props.min)
provide('max',props.max)
const slider = ref<HTMLElement>(null);
const button = ref<InstanceType<typeof SliderButton>>(null);
const sliderSize = ref<number>(1);
const firstValue = ref<number>(0);

//bar [problem] 如何将barStyle赋予style?
// const barStyle = computed(() => ({ "width": barSize}));
const barSize = computed(() => (`${ 100 * (firstValue.value - props.min) / (props.max - props.min) }%`))
onMounted(() => {
  window.addEventListener('resize', resizeSize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeSize);
});
watch(()=>props.value,(newData)=>{
  setValue()
})
// 点击主体
const mainClick = (event: MouseEvent) => {
  resizeSize();
  //获取鼠标点击距离slider最左侧的距离
  //event.offsetX可以直接获取鼠标距离节点左侧的偏移量,但是数值会有误差 所以采用getBoundingClientRect
  const sliderOffsetLeft = slider.value.getBoundingClientRect().left; //DOM元素到浏览器可视范围的距离
  setPosition(((event.clientX - sliderOffsetLeft) / sliderSize.value) * 100);
};
const resizeSize = () => {
  slider.value && !(sliderSize.value = slider.value.clientWidth);
};
  

const setPosition = (percent: number): void => {
  button.value.setPosition(percent);
};
const setValue = ()=>{
  firstValue.value = props.value
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
