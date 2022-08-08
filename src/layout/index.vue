<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside>
          <SideNav></SideNav>
        </el-aside>
        <el-container direction="vertical">
          <Tabs v-if="globalStore.themeConfig.showTabs"></Tabs>
          <el-main>
            <div class="rouer_view">
              <router-view></router-view>
            </div>
          </el-main>
          <el-footer v-if="globalStore.themeConfig.showFooter"><Footer></Footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Header from './Header/index.vue';
import SideNav from './SideNav/index.vue';
import Tabs from './Tabs/index.vue';
import Footer from './Footer/index.vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
const globalStore = GlobalStore();
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
