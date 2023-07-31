<template>
  {{ elementX }}
  {{ elementY }}
  {{ elementWidth }}
  {{ elementHeight }}
  <div class="magnifier">
    <div class="little-box"><img :src="imageURL" alt="" ref="littleImage" class="little-image" /></div>
    <div class="big-box" ref="bigBox" :style="bigBoxStyle">
      <div class="big-image" :style="bigImageStyle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
/*
  1、监听 little-image 鼠标进入/离开事件 计算offsetX/Y
  2、使用 BGC背景图 + translate 展示放大镜
*/
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';
interface MagnifierProps {
  imageURL: string; //图片地址
  scale?: number; //放大倍数
}
const props = withDefaults(defineProps<MagnifierProps>(), {
  imageURL: 'src/assets/images/images.jpeg',
  scale: 2 // bug
});
const littleImage = ref<HTMLElement>();
const bigBox = ref<HTMLElement>();
const { isOutside, elementX, elementY, elementWidth, elementHeight } = useMouseInElement(littleImage);
const calcTranslate = (elementX: number, elementY: number): { translateX: number; translateY: number } => {
  let bigBoxWidth = bigBox.value?.offsetWidth || 0;
  let offsetLength = Math.ceil(bigBoxWidth / 2);
  let minRange = Math.ceil(bigBoxWidth / 2 / props.scale);
  let maxRange = elementHeight.value - minRange;
  console.log('🚀::::::🐶💩', bigBoxWidth, minRange, maxRange, 10, 78);
  // 100px的放大镜 实际是 原图的 bigBoxWidth/props.scale  边界bigBoxWidth/props.scale/2

  // 加入
  // 八种边界 四角+四边
  // const translateX = Math.min(Math.max(-elementX * props.scale + offsetLength, -maxRange * props.scale), minRange);
  // const translateY = Math.min(Math.max(-elementY * props.scale + offsetLength, -maxRange * props.scale), minRange);
  // return { translateX, translateY };
  if (elementX < minRange && elementY < minRange) {
    return { translateX: 0, translateY: 0 };
  } else if (elementX > maxRange && elementY > maxRange) {
    return { translateX: -elementWidth.value * props.scale + offsetLength * props.scale, translateY: -elementHeight.value * props.scale + bigBoxWidth * props.scale + offsetLength * props.scale };
  } else if (elementX < minRange && elementY > maxRange) {
    return { translateX: 0, translateY: -elementHeight.value * props.scale + bigBoxWidth * props.scale + offsetLength * props.scale };
  } else if (elementX > maxRange && elementY < minRange) {
    return { translateX: -elementWidth.value * props.scale + offsetLength * props.scale, translateY: 0 };
  } else if (elementX < minRange) {
    return { translateX: 0, translateY: -elementY };
  } else if (elementX > maxRange) {
    return { translateX: -elementWidth.value * props.scale + offsetLength * props.scale, translateY: -elementY };
  } else if (elementY < minRange) {
    return { translateX: -elementX * props.scale + offsetLength, translateY: 0 };
  } else if (elementY > maxRange) {
    return { translateX: -elementX * props.scale + offsetLength, translateY: -elementHeight.value * props.scale + bigBoxWidth * props.scale + offsetLength * props.scale };
  } else {
    return { translateX: -elementX * props.scale + offsetLength, translateY: -elementY };
  }
};
const bigBoxStyle = computed(() => {
  return {};
  return isOutside.value ? { display: 'none' } : { display: 'block' };
});
const bigImageStyle = computed(() => {
  // let { translateX, translateY } = calcTranslate(15, 18);
  if (isOutside.value) {
    return { display: 'none' };
  } else {
    let { translateX, translateY } = calcTranslate(elementX.value, elementY.value);
    console.log('🚀::::::🐶💩', translateX, translateY);
    return {
      width: props.scale * elementWidth.value + 'px',
      height: props.scale * elementHeight.value + 'px',
      backgroundImage: `url(${props.imageURL})`,
      transform: `translate(${translateX}px, ${translateY}px)`
    };
  }
});
</script>
<style lang="scss" scoped>
.magnifier {
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  .little-box {
    width: 100%;
    height: 100%;
    .little-image {
      width: 100%;
      height: 100%;
    }
  }
  .big-box {
    position: relative;
    top: 40px;
    width: 100px;
    height: 100px;

    // overflow: hidden;
    border: 1px solid red;
    .big-image {
      background-repeat: no-repeat;
      background-position: left left;
      background-size: 100%;
    }
  }
}
</style>
