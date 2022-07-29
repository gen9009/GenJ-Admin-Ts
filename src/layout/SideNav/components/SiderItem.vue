<template>
  <template v-for="(sider, siderSort) in siderList" :key="siderSort">
    <!-- 第一层 -->
    <el-sub-menu v-if="sider.children && sider.children.length" :index="sider.path">
      <template #title>
        <!--[problem] 按配置生成icon可能需要tsx  -->
        <el-icon v-if="sider.icon"><i-ep-location /></el-icon>
        <span>{{ sider.title }}</span>
      </template>
      <SiderItem :sider-list="sider.children"></SiderItem>
    </el-sub-menu>
    <el-menu-item v-else :index="sider.path">{{ sider.title }}</el-menu-item>
  </template>
</template>
<script setup lang="ts">
import SiderItem from '@/layout/SideNav/components/SiderItem.vue';
defineProps<{ siderList: Menu.MenuOptions[] }>();
</script>
<style lang="scss" scoped></style>
