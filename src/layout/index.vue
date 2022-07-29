<template>
  <Header></Header>
  <SideNav></SideNav>
  <Tabs></Tabs>
  <Footer></Footer>

  <router-view></router-view>
</template>
<script setup lang="ts">
import Header from './Header/index.vue';
import SideNav from './SideNav/index.vue';
import Footer from './Footer/index.vue';
import Tabs from './Tabs/index.vue';
</script>
<style lang="scss" scoped></style>
