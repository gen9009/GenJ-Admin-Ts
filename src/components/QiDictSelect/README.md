# 说明

## 需要封装啥?

- 自动调用 Dict 或者 自定义接口 渲染 Select 模版

## 使用

```vue
<script>
import { getDictApi } from '@/service/modules/common';

import { ref , reactive } from 'vue'
const form = ref({})
const form = reactive({
  project:''
})
const getProjectDict =  getDictApi()
<script>
<template>
  <QiDictSelect v-model="form.project" dict='131231'>
  </QiDictSelect>
    <QiDictSelect v-model="form.project" :dict='131231'>
  </QiDictSelect>
    <QiDictSelect v-model="form.project" :dict='getDictApi'>
  </QiDictSelect>
   <QiDictSelect v-model="form.project" :api='getDictApi'>
  </QiDictSelect>
</template>

```
