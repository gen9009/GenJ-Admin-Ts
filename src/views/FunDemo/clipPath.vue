<template>
  <div class="flex">
    <!-- 动画 -->
    <QiCard>
      <div class="donghua"></div>
    </QiCard>
    <!--  不规则图 -->
    <QiCard>
      <div class="irregular"><div class="irregular-son"></div></div>
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
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: polygon(100% 90%, 80% 10%, 10% 5%, 20% 90%);
  background-color: red;
  animation: animation-bgc 2s ease-out infinite;
  .irregular-son {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    clip-path: polygon(100% 90%, 80% 10%, 10% 5%, 20% 90%);
    background-color: var(--el-color-primary-light-3);
    transform: translate(-50%, -50%);
  }
}
@keyframes animation-bgc {
  0% {
    clip-path: polygon(100% 90%, 80% 10%, 10% 5%, 20% 90%);
  }
  100% {
    clip-path: polygon(100% 90%, 80% 10%, 10% 5%, 20% 90%);
  }
}
</style>
