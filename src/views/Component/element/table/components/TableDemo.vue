<script setup lang="tsx">
import { getList } from '@/service/modules/table';
import { getDictApi } from '@/service/modules/dict';
import { ColumnProps } from '@/components/QiTable/interface';
import { ElMessage,ElButton } from 'element-plus';
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
      props: {
        placeholder: '我是输入提示',
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
  {
    prop: 'color',
    label: '颜色',
    width: 140,
    render: scope => {
      return (
         <ElButton type="primary" plain style={{'boxShadow':scope.row.color}}  onClick={() => {
            ElMessage.success('tsx渲染单元格');
          }}>🫵🏼</ElButton>
      );
    },
    // 字典请求为枚举数据
    // dict:[
    //   {code:0,value:'大哥'},
    //   {code:1,value:'二哥'},
    //   {code:2,value:'三弟'}
    // ],
    // 字典请求不带参数
    dict: getDictApi,
    // 字典请求携带参数
    // dict: () => getUserGender({ id: 1 }),

    search: { el: 'select' }
  }, //搜索列
  { prop: 'number', label: '数字', width: 120,   dict: getDictApi, search: { el: 'select-v2' } }, //搜索 
  // // tsx渲染列
  {
    prop: 'image',
    label: '图片',
    width: 140,
    render: scope => {
      return (
          <el-image src={scope.row.image} preview-src-list={[scope.row.image]} preview-teleported/>
      );
    }
  },
  // tsx渲染表头
  {
    prop: 'time',
    label: '时间',
    width: 220,
    search: { el: 'time-picker' , span: 12,},
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
  },
  { prop: "operation", label: "操作", fixed: "right", width: 220 }
];

const getTableList = (params: any) => {
  return getList(params);
};
</script>
<template>
      <QiTable :columns="columns" :requestApi="getTableList" height="300px">
        <template #tableHeader="scope">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">🍔</el-button>
      </template>
        <!-- Expand -->
        <template #expand="scope">
          {{ scope.row.expand }}
        </template>
        <template #operation="scope">
        <ElButton type="primary" link>查看</ElButton>
        <ElButton type="primary" link>编辑</ElButton>
        <ElButton type="primary" link>详情</ElButton>
        <ElButton type="primary" link>删除</ElButton>
      </template>
      </QiTable>
</template>

<style lang="scss" scoped></style>
