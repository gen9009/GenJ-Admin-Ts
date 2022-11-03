<template>
  <div id="form_moudle" ref="tab">123</div>
  {{navTabs}}
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import NavTabs from '@/config/menuConfig/index';
const navTabs = reactive(NavTabs);

</script>
<style lang="scss" scoped></style>
