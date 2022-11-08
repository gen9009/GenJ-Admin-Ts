<template>
  <!-- 
    infinite-list-container 为可视区域的容器
    infinite-list-phantom 为容器内的占位，高度为总列表高度，用于形成滚动条
    infinite-list 为列表项的渲染区域
    -->
  <!-- https://juejin.cn/post/6844903982742110216#comment -->
  <div class="virtual_list">
    <div class="infinite-list-container">
      <div class="infinite-list-phantom">
        <div class="infinite-list">
          <div class="item" v-for="item in list" :key="item.name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//10000条数据列表
// const list = new Array(10000).fill('').map((v, i) => ({ name: i + 1, label: i }));
// //单个单位所占高度
// const itemSize;
// //可视区域高度
// const screenHeight;
// //当前滚动位置
// const scrollTop;

// //列表总高度
// const listHeight = list.length * itemSize;

// //可显示列表项数
// const visibleCount = Math.ceil(screenHeight/itemSize)

// //数据起始索引
// const startIndex = Math.floor(scrollTop/itemSize)

// //数据结束索引
// const endIndex = startIndex + visibleCount

// //列表显示数据
// const visibleData = list.slice(startIndex,endIndex)

// //数据滚动偏移量
// const startOffset = scrollTop 


</script>
<style lang="scss" scoped>
.virtual_list {
  height: 100%;
  .infinite-list-container {
    height: 100%;
    .infinite-list-phantom {
      height: 100%;
      .infinite-list {
        height: 100%;
        .item {
          width: 100%;
          height: 30px;
          text-align: center;
          background-color: #fff;
          border: 1px dashed #eee;
        }
      }
    }
  }
}
</style>
