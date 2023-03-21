<template>
  <div class="slider-btn" 
  @mousedown="onButtonDown($event)"
  :style="{ left: currentPosition }"></div>
</template>
<script setup lang="ts">
import { onMounted, inject, computed,ref } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
});
const min = inject('min') as number;
const max = inject('max') as number;
const sliderSize = inject('sliderSize',ref(1))
const resizeSize = inject('resizeSize',()=>{})
const dragging = ref(false)
const newPosition = ref(0)
const startPosition = ref(0)
const startX = ref(0)
const currentX = ref(0)
const onButtonDown = (event:MouseEvent)=>{
  onDragStart(event)
  window.addEventListener('mousemove',onDragging)
  window.addEventListener('mouseup',onDragEnd)
}
//鼠标按下后 开启drag状态 记录当前值
const onDragStart = (event:MouseEvent)=>{
  startX.value = event.clientX
  dragging.value = true
  startPosition.value = parseFloat(currentPosition.value) 
  newPosition.value = parseFloat(currentPosition.value) // 100% -> 100
}
//鼠标拖动 计算鼠标移动百分比距离
const onDragging = (event:MouseEvent) => {
  let diff = 0
  resizeSize()
  if(dragging.value){
    currentX.value = event.clientX;
    diff =  (currentX.value - startX.value)/(sliderSize.value/100)
    newPosition.value = startPosition.value + diff
    console.log('🚀::::::🐶','button', sliderSize)
    setPosition(newPosition.value)
  }
}
//鼠标弹起 关闭drag状态 
const onDragEnd = (event:MouseEvent) => {
  if(dragging.value){
    dragging.value = false;
  }
  window.removeEventListener('mousemove',onDragging)
  window.removeEventListener('mouseup',onDragEnd)
}

onMounted(() => {

});
const currentPosition = computed(() => {
  return  `${((props.modelValue - min) / (max - min)) * 100}%`
});
const setPosition = (newPosition:number) => {
  if (newPosition === null || isNaN(newPosition)) return;
  if (newPosition < 0) {
    newPosition = 0;
  } else if (newPosition > 100) {
    newPosition = 100;
  }
  //计算 (通过offsetX百分比 得到 min与max中间刻度真实距离value)
  let value = (newPosition / 100) * (max - min) + min;
  value = parseFloat(value.toFixed(2)); //粗略计算 保留两位
  emit('update:modelValue', value);
};

defineExpose({
  setPosition
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
