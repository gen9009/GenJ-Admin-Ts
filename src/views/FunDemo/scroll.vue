<template>
  <div id="scroll-demo">
    <div class="item">
      <h5>scrollTo🔨</h5>
      <div ref="scrollBox" class="scrollBox">
        <div class="jsScroll">
          <el-button @click="scrollToBottom" class="top-button">丝滑到底</el-button>
          <el-button @click="scrollToTop" class="bottom-button">返回顶部</el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <h5>scrollIntoView🔧</h5>
      <div class="scrollBox">
        <div class="cssScroll">
          <el-button class="top-button" id="top" @click="scrollToSection('bottom')">丝滑到底</el-button>
          <el-button class="bottom-button" id="bottom" @click="scrollToSection('top')">返回顶部</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const scrollBox = ref();
const scrollToBottom = () => {
  const height = scrollBox.value.scrollHeight;
  const c = scrollBox.value.scrollTop;
  if (height - scrollBox.value.offsetHeight <= c) {
    window.cancelAnimationFrame(c);
  } else {
    let step = Math.ceil((height - c) / 16);
    window.requestAnimationFrame(scrollToBottom);
    scrollBox.value.scrollTo(0, c + step);
  }
};

const scrollToTop = () => {
  const c = scrollBox.value.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    scrollBox.value.scrollTo(0, c - c / 8); //c - c / 8表示将滚动条向上滚动到当前位置的7/8处
  } else {
    window.cancelAnimationFrame(c);
  }
};

// scrollIntoView 滚动父级容器,使得元素出现在视口
const scrollToSection = (id: string) => {
  let section = document.getElementById(id);
  section && section.scrollIntoView({ behavior: 'smooth', block: 'end' });
};
</script>
<style lang="scss" scoped>
#scroll-demo {
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
  .top-button {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .bottom-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
.el-button + .el-button {
  margin: 0;
}
</style>
