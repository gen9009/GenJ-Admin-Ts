<script setup lang="ts">
import QiSearchForm from '@/components/QiSearchForm/index.vue';
import { ColumnProps } from './interface';
import { ref, reactive, onMounted } from 'vue';
import { useTable } from '@/components/QiTsTable/useTable';
import Pagination from './components/Pagination.vue';
import TableColumn from './components/TableColumn.vue';
interface TableProps {
  columns: ColumnProps[]; //表格配置项
  requestApi: (params: any) => Promise<any>; // 获取表格数据接口
}
// 父组件传递的参数
// const props = defineProps<TableProps>() //基于类型声明 无法配置默认值
// const props = defineProps({columns:{type:Array,required:true}}) // 运行时声明 配置基于vue语法配置且编译器无法推断类型
//withDefaults 编译器宏
const props = withDefaults(defineProps<TableProps>(), {
  columns: () => []
});
const { getTableList, tableData, pageable, handleSizeChange, handleCurrentChange } = useTable(props.requestApi);
onMounted(() => {
  getTableList();
});
</script>

<template>
  <!-- Search搜索区域 -->
  <QiSearchForm></QiSearchForm>
  <!-- Table主体区域 -->
  <div class="table-main">
    <!-- 表格头部的操作按钮插槽 -->
    <div class="table-main-header">
      <div class="table-main-header-left">
        <slot name="tableHeader"></slot>
      </div>
      <div class="table-main-header-right">
        <slot name="toolButton">
          <ElButton type="text">打印</ElButton>
        </slot>
      </div>
    </div>
    <!-- ElTabel -->
    <ElTable :data="tableData" style="width: 100%" v-bind="$attrs">
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
          <!-- 生成具名插槽,然后会插入到子组件中的default中,将slotName与item.prop两值比较，进行渲染 -->
          <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
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
          <div>我就是暂无数据</div>
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
