<template>
  <div class="magnifier">
    <div class="little-box">
      <img :src="imageURL" alt="" ref="littleImage" class="little-image" />
      <div class="little-mack" :style="mackStyle"></div>
    </div>
    <div class="big-box" ref="bigBox" :style="bigBoxStyle">
      <div class="big-image" :style="bigImageStyle"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
/*
  1、分为小图、大图两部分 小图内部含有鼠标选择框，大图内部使用背景图放大展示 （一般使用高清图）
  2、使用 BGC背景图 + translate 展示放大镜 ()
*/
import { ref, computed } from 'vue';
import { useMouseInElement } from '@vueuse/core';
import imageURL from '@/assets/images/avatar.png';

interface MagnifierProps {
  imageURL: string; //图片地址
  scale?: number; //放大倍数
  mackWidth?: number;
  mackHeight?: number;
}
const props = withDefaults(defineProps<MagnifierProps>(), {
  imageURL: imageURL,
  scale: 2,
  mackWidth: 50,
  mackHeight: 50
});

const littleImage = ref<HTMLElement>();

const bigBox = ref<HTMLElement>();

const { isOutside, elementX, elementY, elementWidth, elementHeight } = useMouseInElement(littleImage);

const bigBoxStyle = computed(() => {
  return isOutside.value ? { display: 'none' } : { display: 'block' };
});

const mackStyle = computed(() => {
  if (isOutside.value) {
    return { display: 'none' };
  }
  const offsetX = props.mackWidth! / 2;
  const offsetY = props.mackHeight! / 2;
  let positionX = Math.max(0, Math.min(elementX.value - offsetX, elementWidth.value - props.mackWidth!));
  let positionY = Math.max(0, Math.min(elementY.value - offsetY, elementHeight.value - props.mackHeight!));
  return {
    left: `${positionX}px`,
    top: `${positionY}px`
  };
});

const bigImageStyle = computed(() => {
  if (isOutside.value) {
    return { display: 'none' };
  }
  return {
    width: `${props.scale! * elementWidth.value}px`,
    height: `${props.scale! * elementHeight.value}px`,
    backgroundImage: `url(${props.imageURL})`,
    transform: `translate(calc(-${props.scale}*${mackStyle.value.left || '0px'}),calc(-${props.scale}*${mackStyle.value.top || '0px'}))`
  };
});
</script>
<style lang="scss" scoped>
.magnifier {
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  .little-box {
    position: relative;
    width: 100%;
    height: 100%;
    .little-image {
      width: 100%;
      height: 100%;
    }
    .little-mack {
      position: absolute;
      width: calc(v-bind(mackWidth) * 1px);
      height: calc(v-bind(mackHeight) * 1px);
      background-color: rgba($color: #000000, $alpha: 20%);
    }
  }
  .big-box {
    position: relative;
    top: 40px;
    width: calc(v-bind(mackWidth) * v-bind(scale) * 1px);
    height: calc(v-bind(mackWidth) * v-bind(scale) * 1px);
    overflow: hidden;
    border: 1px solid saddlebrown;
    .big-image {
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
