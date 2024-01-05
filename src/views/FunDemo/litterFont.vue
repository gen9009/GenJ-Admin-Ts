<template>
  <div id="litter-font">
    <div class="item">
      svg-demo
      <br />
      <br />
      无法换行
      <br />
      <br />
      <div class="svg-demo">
        <svg :width="svgOption.svgWidth" :height="svgOption.svgHeight">
          <text dominant-baseline="ideographic" :font-size="svgOption.litterFont" x="0" :y="svgOption.svgHeight">我是六号字体</text>
        </svg>
        <div class="big-font">我是大字体</div>
      </div>
    </div>
    <div class="item">
      scale-demo
      <br />
      <br />
      留白
      <br />
      <br />
      <div class="scale-demo">
        <div class="big-font">我是大字体</div>
        <div class="litter-font">我是六号字体</div>
        1
      </div>
    </div>
    <div class="item">
      zoom-demo
      <br />
      <br />
      没有留白
      <br />
      <br />
      <div class="zoom-demo">
        <div class="big-font">我是大字体</div>
        <div class="litter-font">我是六号字体</div>
        1
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
const svgOption: any = reactive({
  svgTextLength: 7, //svg text文本字数
  litterFont: 6, //svg text文本字数
  svgHeight: 32, //根据父级元素字体大小确定高度
  svgWidth: computed(() => svgOption.litterFont * svgOption.svgTextLength) //根据text文字长度计算
});
</script>
<style lang="scss" scoped>
#litter-font {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);

  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  height: 100%;
  padding: 10px;
  margin: auto;
  scroll-behavior: smooth;
  .item {
    position: relative;
    height: 300px;
    padding: 10px;
    border: 1px solid #eeeeee;
    h5 {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      white-space: nowrap;
      transform: translate(-50%, -50%);
    }
  }
}
.svg-demo {
  display: flex;
  height: 32px;
  line-height: 32px;
  .big-font {
    font-size: 32px;
  }
}
.scale-demo {
  display: flex;
  align-items: baseline;
  height: 32px;
  line-height: 32px;
  .big-font {
    font-size: 32px;
  }
  .litter-font {
    font-size: 6px;
    line-height: 6px;
    transform: scale(0.5);
    transform-origin: left;
  }
}
.zoom-demo {
  display: flex;
  align-items: baseline;
  height: 32px;
  line-height: 32px;
  .big-font {
    font-size: 32px;
  }
  .litter-font {
    font-size: 6px;
    line-height: 6px;
    zoom: 0.5;
    transform-origin: left;
  }
}
</style>
