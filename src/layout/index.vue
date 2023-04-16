<template>
  <div class="common-layout">
    <el-container class="common-layout-container">
      <el-aside :style="{ width: isCollapse ? '114px' : '220px' }"><SideNav></SideNav></el-aside>
      <el-main>
        <el-container class="common-layout-container">
          <el-header><Header></Header></el-header>
          <el-container direction="vertical">
            <Tabs v-if="globalStore.themeConfig.showTabs"></Tabs>
            <el-main class="router-content">
              <transition appear name="fade-transform" mode="out-in">
                <!-- <router-view #default="{Component}">-->
                <router-view v-slot="{ Component }">
                  <keep-alive>
                    <component :is="Component"></component>
                  </keep-alive>
                </router-view>
              </transition>
            </el-main>
            <el-footer v-if="globalStore.themeConfig.showFooter"><Footer></Footer></el-footer>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Header from './Header/index.vue';
import SideNav from './SideNav/index.vue';
import Tabs from './Tabs/index.vue';
import Footer from './Footer/index.vue';
import { GlobalStore } from '@/store/modules/GlobalStore';
import { MenuStore } from '@/store/modules/MenuStore';
import { computed, ref } from 'vue';
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);
const globalStore = GlobalStore();
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
