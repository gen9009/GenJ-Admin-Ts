<template>
  <span class="text">格式化</span>
  <el-input v-model="input" :formatter="(value:string) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="(value:string)  => value.replace(/\$\s?|(,*)/g, '')"></el-input>

  <span class="text">密码框</span>
  <el-input v-model="input" type="password" placeholder="请输入密码" show-password />

  <span class="text">插槽(前)</span>
  <el-input v-model="input">
    <template #prefix>
      <span class="iconfont" :class="`icon-tupian`"></span>
    </template>
    <template #prepend>
      <el-select placeholder="Select" style="width: 115px">
        <el-option label="Restaurant" value="1" />
        <el-option label="Order No." value="2" />
        <el-option label="Tel" value="3" />
      </el-select>
    </template>
  </el-input>

  <span class="text">插槽(后)</span>
  <el-input v-model="input">
    <template #suffix>
      <span class="iconfont" :class="`icon-tupian`"></span>
    </template>
    <template #append>
      <el-select placeholder="Select" style="width: 115px">
        <el-option label="Restaurant" value="1" />
        <el-option label="Order No." value="2" />
        <el-option label="Tel" value="3" />
      </el-select>
    </template>
  </el-input>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const input = ref('');
</script>
<style lang="scss" scoped>
.text {
  font-size: 12px;
}
</style>
