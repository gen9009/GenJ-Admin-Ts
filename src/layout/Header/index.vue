<template>
  <div class="header">
    <!-- Left Logo -->
    <div class="logo">
      <img src="@/assets/vue.svg" alt="" draggable="false" />
      <span class="title">GenJ-Admin</span>
    </div>
    <!-- Right 组件大小 中英翻译 换肤 全屏  账号切换-->
    <div class="comp">
      <div class="comp_size">
        <CompSize></CompSize>
      </div>
      <div class="language">
        <Language></Language>
      </div>
      <div class="color_theme">
        <ColorTheme></ColorTheme>
      </div>
      <div class="full_screen">
        <FullScreen></FullScreen>
      </div>
      <div class="user_change">
        <UseImg></UseImg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CompSize from './componts/CompSize.vue';
import ColorTheme from './componts/ColorTheme.vue';
import Language from './componts/Language.vue';
import UseImg from './componts/UserImg.vue';
import FullScreen from './componts/FullScreen.vue';
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
