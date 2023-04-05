<template>
  <div class="demo-basic--circle">
    <el-dropdown trigger="click" @command="doUserOption" size="small">
      <div class="block el-dropdown-link">
        <el-avatar shape="square" :size="30" :src="notAvatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="'showUserInfo'">个人资料</el-dropdown-item>
          <el-dropdown-item :command="'changePasswordInfo'">修改密码</el-dropdown-item>
          <el-dropdown-item divided :command="'logout'">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <UserInfoDia ref="userRef"></UserInfoDia>
  <PasswordDia ref="passRef"></PasswordDia>
</template>
<script setup lang="ts">
import notAvatar from '@/assets/images/notAvatar.png'
import PasswordDia from './PasswordDia.vue';
import UserInfoDia from './UserInfoDia.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
type UserInfoDia = InstanceType<typeof UserInfoDia>;
type PasswordDia = InstanceType<typeof PasswordDia>;

interface UserOptions {
  showUserInfo: Function;
  changePasswordInfo: Function;
  logout: Function;
}

const router = useRouter();

//声明组件
const userRef = ref<null | UserInfoDia>(null);
const passRef = ref<null | PasswordDia>(null);

const userOptions = reactive<UserOptions>({
  showUserInfo: () => {
    userRef.value?.openDia();
  },
  changePasswordInfo: () => {
    passRef.value?.openDia();
  },
  logout: () => {
    router.push('/login');
  }
});

const doUserOption = (commandInfo: string) => {
  userOptions[commandInfo as keyof typeof userOptions]();
};
</script>
<style lang="scss" scoped></style>
