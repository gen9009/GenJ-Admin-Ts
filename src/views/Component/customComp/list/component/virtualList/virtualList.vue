<template>
  <!-- 
    infinite-list-container 为可视区域的容器
    infinite-list-phantom 为容器内的占位，高度为总列表高度，用于形成滚动条
    infinite-list 为列表项的渲染区域
    -->
  <!-- https://juejin.cn/post/6844903982742110216#comment -->
  <div class="virtual-list">
    <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent()">
      <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }">
        <div class="infinite-list" :style="{ transform: `translate3d(0,${startOffset}px,0)` }">
          <div class="item" v-for="item in visibleData" :key="item.name" :style="{ height: virtualOption.itemSize + 'px', lineHeight: virtualOption.itemSize + 'px' }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, ComputedRef, onMounted } from 'vue';

const listRef = ref();
//10000条数据列表
const list = new Array(10000).fill('').map((v, i) => ({ name: i + 1, label: i }));
const virtualOption = reactive({
  itemSize: 48, // 每个单元所占高度
  screenHeight: 0, // 可视区域高度 infinite-list-container的height
  scrollTop: 0 // 当前滚动位置
});
onMounted(() => {
  virtualOption.screenHeight = listRef.value.clientHeight;
});
//列表总高度
let listHeight = list.length * virtualOption.itemSize;

//可显示列表项数量
let visibleCount: ComputedRef<number> = computed(() => Math.ceil(virtualOption.screenHeight / virtualOption.itemSize));
//数据起始索引
let startIndex: ComputedRef<number> = computed(() => Math.floor(virtualOption.scrollTop / virtualOption.itemSize));
//数据结束索引
let endIndex: ComputedRef<number> = computed(() => startIndex.value + visibleCount.value);
// 数据展示列表
let visibleData: ComputedRef<Array<{ name: number; label: number }>> = computed(() => list.slice(startIndex.value, endIndex.value + 1));
//数据滚动偏移量
let startOffset: ComputedRef<number> = computed(() => virtualOption.scrollTop - (virtualOption.scrollTop % virtualOption.itemSize));

//滚动事件
let scrollEvent = () => {
  virtualOption.scrollTop = listRef.value.scrollTop;
};
</script>
<style lang="scss" scoped>
.virtual-list {
  height: 100%;
  .infinite-list-container {
    height: 100%;
    overflow: auto;
    .infinite-list-phantom {
      // height: 100%;
      background-color: #eeeeee;
      .infinite-list {
        height: 100%;
        .item {
          width: 100%;
          text-align: center;
          background-color: #ffffff;
          border: 1px dashed #eeeeee;
        }
      }
    }
  }
}
</style>
