<template>
  <div id="scroll_demo">
    <div class="item">
      <h5>scrollTo🔨</h5>
      <div ref="scrollBox" class="scrollBox">
        <div class="jsScroll">
          <el-button @click="scrollToBottom" class="top_button">丝滑到底</el-button>
          <el-button @click="scrollToTop" class="bottom_button">返回顶部</el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <h5>scrollIntoView🔧</h5>
      <div class="scrollBox">
        <div class="cssScroll">
          <el-button class="top_button" id="top" @click="scrollToSection('bottom')">丝滑到底</el-button>
          <el-button class="bottom_button" id="bottom" @click="scrollToSection('top')">返回顶部</el-button>
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

const scrollToSection = (id: string) => {
  let section = document.getElementById(id);
  section && section.scrollIntoView({ behavior: 'smooth', block: 'end' });
};
</script>
<style lang="scss" scoped>
#scroll_demo {
  scroll-behavior: smooth;
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
    h5 {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .bottom_button {
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
