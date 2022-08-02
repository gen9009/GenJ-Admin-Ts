<template>
  <el-dialog v-model="passVisible" :show-close="false" title="修改密码" width="500px">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="旧密码" required>
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" required>
        <el-input type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" required>
        <el-input type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const passVisible = ref(false);
const openDia = () => {
  passVisible.value = true;
};
defineExpose({
  openDia
});
</script>
<style lang="scss" scoped></style>
