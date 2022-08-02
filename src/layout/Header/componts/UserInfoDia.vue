<template>
  <el-dialog v-model="userVisible" :show-close="false" title="个人资料"> 在学习上我勤奋严谨，在掌握了本专业知识的基础上，不忘拓展自己的知识面，对课外知识也有比较广泛的涉猎。我还很重视英语的学习，不断努力扩大词汇量，英语交际能力也有了长足的进步 </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const userVisible = ref(false);
const openDia = () => {
  userVisible.value = true;
};
defineExpose({
  openDia
});
</script>
<style lang="scss" scoped></style>
