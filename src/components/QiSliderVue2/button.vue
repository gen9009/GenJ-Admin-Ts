<template>
  <div class="slider-btn" :style="{ left: currentPosition }"></div>
  {{ currentPosition }}
</template>
<script setup lang="ts">
import { onMounted, inject, computed } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number
  }
});
const min = inject('min') as number;
const max = inject('max') as number;
onMounted(() => {
  // window.addEventListener('mousedown',btnMouseDown)
  // window.addEventListener('mouseMove',btnMouseMove)
  // window.addEventListener('mouseup',btnMouseUp)
});
const currentPosition = computed(() => {
  console.log('🚀::::::🐶',min,max,props.modelValue)
  return  `${((props.modelValue - min) / (max - min)) * 100}%`
});
const setPosition = newPosition => {
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
// 滑块开始接触
const btnMouseDown = () => {};
// 滑块移动
const btnMouseMove = () => {};
// 鼠标停止接触
const btnMouseUp = () => {};

defineExpose({
  setPosition
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
