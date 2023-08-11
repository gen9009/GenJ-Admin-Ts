<template>
  <div ref="chartElement" id="chartElement" style="width: 100%; height: 100%"></div>
</template>
<script setup lang="ts">
import echarts from '@/utils/echarts';
import { useDebounceFn } from '@vueuse/core';
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { ECOption } from '@/utils/echarts';
import { animationConfig } from './echartsConfig';
/*
思路
1、初始化实例 更新option   api -> echart.setOption
2、监听窗口拖拽更新图表     api -> echart.resize (注意窗口拖动防抖处理)
*/
interface EchartProps {
  option: ECOption;
  loading: boolean;
}
const props = withDefaults(defineProps<EchartProps>(), {
  loading: false
});

let chartElement = ref<HTMLDivElement>();
let chartInstance = ref<any>();

//初始化echarts
function init() {
  if (!chartElement.value) return;
  // 检测 echart 是否已经挂载在 Dom 上
  const instance = echarts.getInstanceByDom(chartElement.value);
  if (!instance) {
    chartInstance.value = echarts.init(chartElement.value);
  }
  draw();
}
// 更新图表数据
function draw() {
  props.loading && chartInstance.value.showLoading({ ...animationConfig });
  chartInstance.value.setOption(props.option);
}
// 刷新图表
const resize = () => {
  return useDebounceFn(() => chartInstance.value.resize({ animation: { duration: 300 } }), 100, { maxWait: 500 });
};
watch(
  () => props.option,
  () => draw()
);
watch(
  () => props.loading,
  () => (props.loading ? chartInstance.value?.showLoading({ ...animationConfig }) : chartInstance.value?.hideLoading())
);
onMounted(() => {
  init();
  window.addEventListener('resize', resize());
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize());
  chartInstance.value.dispose();
  chartInstance.value = null;
});
defineExpose({
  draw,
  getInstance: () => chartInstance.value
});
</script>
<style lang="scss" scoped></style>
