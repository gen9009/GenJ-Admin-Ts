<script setup lang="ts">
import { getDictApi } from '@/service/modules/common';
import { reactive } from 'vue';

const form = reactive({
  project: ''
});
const change = () => {
  console.log('🚀::::::🐶💩', 'change');
};
</script>
<template>
  <div class="text">dict</div>
  <QiDictSelect v-model="form.project" dict="dict" @change="change" />

  <div class="text">Promise (该方式会多次调用接口)</div>
  <QiDictSelect v-model="form.project" :dict="getDictApi({ code: 'Promise' })" />

  <div class="text">()=>Promise</div>
  <QiDictSelect v-model="form.project" :dict="() => getDictApi({ code: '()=>Promise' })" />
</template>

<style lang="scss" scoped>
.text {
  font-size: 12px;
}
</style>
