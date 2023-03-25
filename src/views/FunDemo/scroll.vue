<template>
  <div id="scroll_demo">
    <div class="item">
      <h5>JS点击</h5>
      <div ref="scrollBox" class="scrollBox">
        <div class="jsScroll">
          <el-button @click="scrollToTop" class="top_button">返回顶部</el-button>
          <el-button @click="scrollToBottom" class="bottom_button">俯冲底部</el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <h5>锚点⚓️点击(BUG中...)</h5>
      <div class="scrollBox">
        <div class="cssScroll">
          <el-button class="top_button"><a id="bottom" href="#top">返回顶部</a></el-button>
          <el-button class="bottom_button"><a id="top" href="#bottom">俯冲底部</a></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const scrollBox = ref();
const scrollToBottom =()=>{
  const height = scrollBox.value.scrollHeight
  scrollBox.value.scrollTo(0,  height); 
}
const scrollToTop = () => {
  const c = scrollBox.value.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    scrollBox.value.scrollTo(0, c - c / 8); //c - c / 8表示将滚动条向上滚动到当前位置的7/8处
  } else {
    window.cancelAnimationFrame(c);
  }
};
</script>
<style lang="scss" scoped>
#scroll_demo {
  padding: 10px;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
  // grid-template-rows: repeat(4,1fr);
  grid-gap: 5px;
  margin: auto;
  .item {
    position: relative;
    height: 300px;
    border: 1px solid #eee;
    padding: 10px;
    h5{
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      white-space: nowrap;
    }
  }
}
.scrollBox {
  width: 100%;
  height: 100%;
  overflow: auto;
  .jsScroll,
  .cssScroll {
    position: relative;

    height: 1000%;
    background-image: linear-gradient(to bottom, var(--el-color-primary-light-9), var(--el-color-primary-light-1));
  }
  .cssScroll {
    scroll-behavior: smooth;
  }

  .top_button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .bottom_button {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
.el-button + .el-button {
  margin: 0;
}
</style>
