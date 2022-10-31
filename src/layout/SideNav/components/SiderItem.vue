<template>
  <template v-for="sider in siderList" :key="sider">
    <!-- 第一层 -->
    <el-sub-menu v-if="sider.children && sider.children.length" :index="sider.path">
      <template #title>
        <!--[problem] 按配置生成icon可能需要tsx  -->
        <span class="iconfont" :class="`icon-${sider.icon}`" v-if="sider.icon"></span>
        <span>{{ sider.title }}</span>
      </template>
      <SiderItem :sider-list="sider.children"></SiderItem>
    </el-sub-menu>
    <el-menu-item v-else :index="sider.path">
      <span class="iconfont" :class="`icon-${sider.icon}`" v-if="sider.icon"></span>
      <template #title>
        <span>{{ sider.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
defineProps<{ siderList: Menu.MenuOptions[] }>();
</script>
<style lang="scss" scoped></style>
