<template>
  <div ref="myChartElement" style="width:100%;height:100%"></div>
</template>
<script setup lang="ts">
import echarts from '@/utils/echarts';
import { ref, reactive, onMounted, toRefs } from 'vue';

const props= (defineProps({
  option:{
    type:Object,
    default:{}
  }
}));
let myChartElement = ref<HTMLElement>();
let myCharts = ref<any>();
//初始化echarts
onMounted(() => {
  console.log(props.option);
  myCharts.value = echarts.init(myChartElement.value!);
  myCharts.value.setOption(props.option);
});
</script>
<style lang="scss" scoped></style>
