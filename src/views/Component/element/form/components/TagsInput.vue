<script setup lang="ts">
import { ref } from 'vue';
const value = ref('');
const options = ref([]);
</script>
<template>
  <div class="text">原始选择</div>
  <el-select v-model="value" multiple collapse-tags collapse-tags-tooltip filterable allow-create default-first-option :reserve-keyword="false" placeholder="请选择">
    <el-option v-for="item in options" :key="item" />
  </el-select>
  <div class="text">模仿输入</div>
  <el-select v-model="value" :loading="false" remote multiple collapse-tags collapse-tags-tooltip filterable allow-create default-first-option :reserve-keyword="false" placeholder="请输入"> </el-select>
</template>
<style lang="scss" scoped>
:deep(.el-select__tags) {
  flex-wrap: nowrap;
  max-width: unset !important;
}
.text {
  font-size: 12px;
}
</style>
