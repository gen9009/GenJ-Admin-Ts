<template>
  <div class="content">
    🫵🏼
    <ElInput v-model="text" placeholder="输入测试省略号"></ElInput>
    <span v-ellipsis class="text">{{ text }}</span>
    🫵🏼
    <span v-ellipsis class="text">{{ text }}</span>
    🫵🏼
    <span v-ellipsis class="text">{{ text }}</span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const text = ref('看看省略号');
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 20px 0 30px;
  text-align: center;
  .text {
    width: 200px;
    margin: 20px 0 30px;
    font-size: 23px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    word-break: keep-all;
  }
  .el-input {
    width: 300px;
  }
}
</style>
