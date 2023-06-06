<script setup lang="tsx">
import { getList } from '@/service/modules/table';
import { getDictApi } from '@/service/modules/dict';
import { ColumnProps } from '@/components/QiTable/interface';
import { ElMessage, ElButton } from 'element-plus';
const columns: ColumnProps[] = [
  { type: 'selection', width: 40, fixed: 'left' }, // select多选框
  { type: 'index', label: '序号', width: 60 }, //index序号
  { type: 'expand', label: '展开行', width: 80 }, //expend展开行
  {
    prop: 'name',
    label: '名称',
    width: 80,
    search: {
      el: 'input',
      order: 1,
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
        <ElButton
          type="primary"
          plain
          style={{ boxShadow: scope.row.color }}
          onClick={() => {
            ElMessage.success('tsx渲染单元格');
          }}
        >
          🫵🏼
        </ElButton>
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
  { prop: 'number', label: '数字', width: 120, dict: getDictApi, search: { el: 'cascader' } }, //搜索
  // // tsx渲染列
  {
    prop: 'image',
    label: '图片',
    width: 140,
    render: scope => {
      return <el-image src={scope.row.image} preview-src-list={[scope.row.image]} preview-teleported />;
    }
  },
  // tsx渲染表头
  // {
  //   prop: 'time',
  //   label: '时间',
  //   width: 220,
  //   search: { el: 'time-picker', span: 12, props: { 'is-range': true, 'start-placeholder': '我是输入提示', 'end-placeholder': '我是输入提示' } },
  //   headerRender: row => {
  //     return (
  //       <el-button
  //         type="primary"
  //         onClick={() => {
  //           ElMessage.success('tsx渲染表头');
  //         }}>
  //         {row.label + 'tsx'}
  //       </el-button>
  //     );
  //   }
  // },
  {
    prop: 'time',
    label: '时间',
    width: 220,
    search: { el: 'date-picker', span: 12, props: { type: 'daterange', 'start-placeholder': '我是输入提示', 'end-placeholder': '我是输入提示' } },
    headerRender: row => {
      return (
        <el-button
          type="primary"
          onClick={() => {
            ElMessage.success('tsx渲染表头');
          }}
        >
          {row.label + 'tsx'}
        </el-button>
      );
    }
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 220 }
];

const getTableList = (params: any) => {
  return getList(params);
};

//表格 单行选择相关配置
const selectAll = (selection: any) => {
  console.log('🚀::::::🐶', '我选择了所有行', selection);
};
const selectChange = (selection: any) => {
  console.log('🚀::::::🐶', '我改变选择了', selection);
};
const selectRow = (selection: any, row: any) => {
  console.log('🚀::::::🐶', '我手动选择了', selection, row);
};
</script>
<template>
  <QiTable :columns="columns" :hasCollapse="true" :requestApi="getTableList" height="300px" row-key="id" @select-all="selectAll" @selection-change="selectChange" @select="selectRow">
    <template #tableHeader>
      <ElButton type="primary">新增</ElButton>
      <ElButton type="primary">🍔 Form与Table一体</ElButton>
    </template>
    <!-- Expand -->
    <template #expand="scope">
      {{ scope.row.expand }}
    </template>
    <template #operation>
      <ElButton type="primary" link>查看</ElButton>
      <ElButton type="primary" link>编辑</ElButton>
      <ElButton type="primary" link>详情</ElButton>
      <ElButton type="primary" link>删除</ElButton>
    </template>
  </QiTable>
</template>

<style lang="scss" scoped></style>
