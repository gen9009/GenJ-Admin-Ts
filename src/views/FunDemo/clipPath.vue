<template>
  <div class="flex">
    <!-- 动画 -->
    <QiCard>
      <div class="donghua"></div>
    </QiCard>
    <!--  不规则图 -->
    <QiCard>
      <div class="irregular"></div>
    </QiCard>
  </div>
</template>
<script setup>
/* 
  clip-path 的魅力
  1、动画
  2、卡劵
  3、箭头
  4、不规则图形 -----> 很多特效都是围绕 clip-path
*/
</script>
<style lang="scss" scoped>
.donghua {
  width: 100%;
  height: 100%;
  clip-path: circle(40% at 0% 0%);
  background-color: var(--el-color-primary-light-3);
  animation: animation-test 2s ease-out infinite;
}
@keyframes animation-test {
  0% {
    clip-path: circle(0 at 20% 20%);
  }
  100% {
    clip-path: circle(150% at 20% 20%);
  }
}
.irregular {
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 90%, 80% 10%, 10% 5%, 20% 90%);
  background-color: var(--el-color-primary-light-3);
}
</style>
