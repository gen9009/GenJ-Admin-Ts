<script lang="ts" setup>
interface Pageable {
  pageNum:number;
  pageSize:number;
  total:number
}
interface PageinationProps {
  pageable:Pageable;
  handleCurrentChange:(num:number)=>void;
  handleSizeChange:(size:number)=>void;
}
defineProps<PageinationProps>()
</script>
<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10, 20, 30, 40]"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :total="pageable.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
  </template>
<style lang='scss' scoped>
</style>
