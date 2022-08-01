<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="demo-ruleForm" status-icon>
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入账号/admin">
            <template #prefix>
              <el-icon><i-ep-user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" show-password autocomplete="true" placeholder="请输入密码/123456">
            <template #prefix>
              <el-icon><i-ep-lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" round size="large" @click="submitForm(loginRef)">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
/* 
  element-plus 登录
  1、定义表单数据 const form = reactive({})
  2、定义规则 const rules = reactive<FormRules>()
  3、定义form组件 const formRef = ref<FormInstance>()
  4、校验 
*/

const loginRef = ref<FormInstance>();
const loginForm = reactive({ userName: 'admin', password: '123456' });
const router = useRouter();

const loginRules = reactive<FormRules>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      //登陆成功 跳转Home首页
      router.push('/home');
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<style lang="scss" scoped>
@import 'style';
</style>
