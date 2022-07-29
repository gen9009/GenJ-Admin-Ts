<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="200px">
          <SideNav></SideNav>
        </el-aside>
        <el-container>
          <el-main>
            <Tabs></Tabs>
            <router-view></router-view>
          </el-main>
          <el-footer><Footer></Footer></el-footer>
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
</script>
<style lang="scss" scoped>
@use 'style.scss';
</style>
