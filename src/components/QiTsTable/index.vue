<script setup lang="ts">
import SearchForm from '@/components/QiTsForm/index.vue'
import Pagination from './components/Pagination.vue'
import {ref,reactive} from 'vue';

</script>
<template>
<!-- Search搜索区域 -->
<SearchForm></SearchForm>
<!-- Table组体区域 -->
<ElTable>


  
</ElTable>
<!-- Page分页区域 -->
<Pagination></Pagination>
</template>

<style lang='scss' scoped>
</style>
