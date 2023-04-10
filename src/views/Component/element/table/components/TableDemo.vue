<script setup lang="tsx">
import { getList } from '@/service/modules/table';
import { ColumnProps } from '@/components/QiTable/interface';
import { ElMessage } from 'element-plus';
const columns: ColumnProps[] = [
  // {type:'selection', width: 40, fixed: "left"},// select多选框
  { type: 'index', label: '序号', width: 60 }, //index序号
  { type: 'expand', label: '展开行', width: 80 }, //expend展开行
  {
    prop: 'name',
    label: '名称',
    width: 80,
    search: {
      el: 'input',
      props: { placeholder: '我是输入提示' },
      event: {
        onInput: (value: string | number) => {
          console.log('🚀::::::🐶', 'onInput', value);
        },
        onChange: (value: string | number) => {
          console.log('🚀::::::🐶', 'onChange', value);
        },
        onBlur: (event: FocusEvent) => {
          console.log('🚀::::::🐶', 'onBlur', event);
        },
        onFocus: (event: FocusEvent) => {
          console.log('🚀::::::🐶', 'onFocus', event);
        }
      }
    }
  }, //普通列
  { prop: 'name', label: '名称', width: 80, search: { el: 'select' } }, //搜索列
  { prop: 'name', label: '名称', width: 80, search: { el: 'select-v2' } }, //搜索列
  // // tsx渲染列
  {
    prop: 'image',
    label: '图片',
    width: 80,
    render: scope => {
      return (
        // <><img src={scope.row.image}  onClick={()=>{ElMessage.success('tsx渲染列')}}></img></>
        <>
          {' '}
          <el-image src={scope.row.image} preview-src-list={[scope.row.image]} />
        </>
      );
    }
  },
  // placeholder={props.column.search?.props.placeholder}

  // tsx渲染表头
  {
    prop: 'time',
    label: '时间',
    width: 120,
    search: { el: 'time-picker' },
    headerRender: row => {
      return (
        <el-button
          type="primaty"
          onClick={() => {
            ElMessage.success('tsx渲染表头');
          }}>
          {row.label + 'tsx'}
        </el-button>
      );
    }
  }
];

const getTableList = (params: any) => {
  return getList(params);
};
</script>
<template>
  <ElRow>
    <ElCol :span="20">
      <QiTable :columns="columns" :requestApi="getTableList">
        <!-- Expand -->
        <template #expand="scope">
          {{ scope.row.expand }}
        </template>
      </QiTable>
    </ElCol>
    <ElCol :span="4"> </ElCol>
  </ElRow>
</template>

<style lang="scss" scoped></style>
