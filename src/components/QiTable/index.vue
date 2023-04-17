<script setup lang="ts">
import QiSearchForm from '@/components/QiSearchForm/index.vue';
import { ColumnProps, DictEnum } from './interface/index';
import { ref, reactive, onMounted, provide, onBeforeMount } from 'vue';
import { useTable } from './useTable';
import Pagination from './components/Pagination.vue';
import TableColumn from './components/TableColumn.vue';
//[problem] 如果移除type, 外部ElTable样式加载失效
import type { ElTable, TableProps } from 'element-plus';
//定义表格的 Props配置
export interface QiTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[]; // 列配置项
  requestApi: (params: any) => Promise<any>;
  border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
}
// 父组件传递的参数
// const props = defineProps<TableProps>() //基于类型声明 无法配置默认值
// const props = defineProps({columns:{type:Array,required:true}}) // 运行时声明 配置基于vue语法配置且编译器无法推断类型
//withDefaults 编译器宏
const props = withDefaults(defineProps<QiTableProps>(), {
  columns: () => [],
  border: true
});
// 定义dictMap 存储dict值
const dictMap = ref(new Map<string, DictEnum[]>());
provide('dictMap', dictMap);
const setDict = async (col: ColumnProps) => {
  if (!col?.dict) return;
  //x! 将从 x 值域中排除 null 和 undefined
  if (typeof col.dict !== 'function') return dictMap.value.set(col.prop!, col.dict);
  let { data } = await col.dict();
  dictMap.value.set(col.prop!, data);
};

// 过滤需要搜索的配置
const searchColumns = props.columns.filter(item => item.search?.el);
// 初始化需要搜索的默认值
searchColumns.forEach((column, index) => {
  setDict(column);
  if (column.search?.defaultValue ?? '' !== '') {
    searchParams.value[column?.search?.key ?? column.prop] = column.search?.defaultValue;
  }
});
const tableRef = ref<InstanceType<typeof ElTable>>();
const { getTableList, tableData, pageable, searchParams, search, reset, handleSizeChange, handleCurrentChange } = useTable(props.requestApi);

onMounted(() => {
  getTableList();
});
defineExpose({
  el: tableRef
});
</script>

<template>
  <!-- Search搜索区域 -->
  <QiSearchForm :searchColumns="searchColumns" :searchParams="searchParams" :search="search" :reset="reset"></QiSearchForm>
  <!-- Table主体区域 -->
  <div class="table-main">
    <!-- 表格头部的操作按钮插槽 -->
    <div class="table-main-header">
      <div class="table-main-header-left">
        <slot name="tableHeader"></slot>
      </div>
      <div class="table-main-header-right">
        <slot name="toolButton">
          <ElButton plain>🔨</ElButton>
          <ElButton plain>🔧</ElButton>
          <ElButton plain>🗡</ElButton>
          <ElButton plain>🔪</ElButton>
        </slot>
      </div>
    </div>
    <!-- ElTabel -->
    <ElTable v-loading ref="tableRef" :data="tableData" :border="border" v-bind="$attrs">
      <!-- 1、默认插槽 -->
      <slot></slot>
      <template v-for="item in props.columns" :key="item">
        <!-- 2-1、定义表格的 序号 多选框  -->
        <el-table-column v-bind="item" :align="item.align ?? 'center'" :reserve-selection="item.type == 'selection'" v-if="item.type == 'selection' || item.type == 'index'" />
        <!-- 2-2、定义表格 expend 展开行 (可以使用tsx语法和作用域插槽) -->
        <el-table-column v-if="item.type === 'expand'" v-bind="item" :align="item.align ?? 'center'" v-slot="scope">
          <component :is="item.render" v-bind="scope" v-if="item.render"></component>
          <slot :name="item.type" v-bind="scope" v-else></slot>
        </el-table-column>
        <!-- 2-3、定义表格 columns配置的列 -->
        <!-- item.type存在时不会去渲染当前列 ['expand', 'selection','index'] -->
        <TableColumn v-if="!item.type && item.prop" :column="item">
          <!--两种计算方式如下
          1、生成具名作用域插槽, 2、<slot>内容插入到子组件, 3、render权重大于插槽 -->
          <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
          <template v-if="Object.keys($slots).includes(item.prop)" :key="item.prop" #[item?.prop]="scope">
            <slot :name="item.prop" v-bind="scope"></slot>
          </template>
          <!-- 例子
          <template key="operation" #name="scope">
            <ElButton type="primary" link>查看</ElButton>
          </template>
          -->
        </TableColumn>
      </template>
      <!-- 3、定义表格最后一行之后的插槽 -->
      <!-- ElTable的 append插槽 与 ElTableColumn的 append类型会冲突 -->
      <template #append>
        <slot name="append"></slot>
      </template>
      <!-- 4、定义无数据插槽 -->
      <template #empty>
        <slot name="empty">
          <div>👅👅👅我就是暂无数据🦷🦷🦷</div>
        </slot>
      </template>
    </ElTable>
    <!-- 分页组件 -->
    <div class="pagination">
      <slot name="pagination">
        <Pagination :pageable="pageable" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></Pagination>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
