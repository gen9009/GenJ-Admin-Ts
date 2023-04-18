<template>
  <img src="@/assets/images/homepage.svg" alt="" />
</template>
<script setup lang="ts">
import { testApi } from '@/service/modules/test';
import { onMounted } from 'vue';
onMounted(() => {
  testApi({ testParams: '123' });
});
</script>

<style lang="scss" scoped>
img {
  position: relative;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
}
.tab {
  display: flex;
  width: 100px;
  overflow: auto;
  background-color: bisque;
  div {
    width: max-content;
    padding: 0 20px;
    background-color: burlywood;
  }
}
</style>
