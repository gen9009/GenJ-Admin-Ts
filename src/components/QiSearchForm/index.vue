<script setup lang="ts">
import { ColumnProps } from '../QiTable/interface/index';
import { Delete, Search } from '@element-plus/icons-vue';
import QiSearchFormItem from './components/QiSearchFormItem.vue';
interface TableSearchProps {
  searchColumns: ColumnProps[]; //搜索Item
  searchParams?: { [key: string]: any }; //搜索参数
  search: (params: any) => void; //搜索方法
  reset: (params: any) => void; //重置方法
}
const props = withDefaults(defineProps<TableSearchProps>(), {
  searchColumns: () => [],
  searchParams: () => ({})
});
// 生成 modelForm
</script>
<template>
  <div class="table-search" v-if="searchColumns.length">
    <el-form :model="searchParams">
      <ElRow :gutter="16">
        <!-- 搜索Item -->
        <template v-bind="item" v-for="(item, index) in searchColumns" :key="item.prop">
          <ElCol :span="item.search?.span ?? 6">
            <div class="qi-search-form-item">
              <el-form-item :label="item.label">
                <QiSearchFormItem :column="item" :searchParams="searchParams"></QiSearchFormItem>
              </el-form-item>
            </div>
          </ElCol>
        </template>
        <ElCol :span="6">
          <div class="operation">
            <!-- 重置 -->
            <el-button :icon="Delete" @click="reset">重置</el-button>
            <!-- 查询 -->
            <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
          </div>
        </ElCol>
      </ElRow>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
