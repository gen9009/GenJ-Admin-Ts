<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
#app,
html,
body {
  height: 100%;
  width: 100%;
  background-color: #000;
}
</style>
