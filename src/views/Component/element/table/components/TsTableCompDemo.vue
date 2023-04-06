<script setup lang="tsx">
import { getList } from '@/service/modules/table';
import { ColumnProps } from '@/components/QiTsTable/interface';
import { ElMessage } from 'element-plus';
const columns: ColumnProps[] = [
  // {type:'selection', width: 40, fixed: "left"},// select多选框
  { type: 'index', label: '序号', width: 60 }, //index序号
  { type: 'expand', label: '展开行', width: 80 }, //expend展开行
  { prop: 'name', label: '名称', width: 80 }, //普通列
  // // tsx渲染列
  {
    prop: 'image',
    label: '图片',
    width: 80,
    render: scope => {
      return  (
      // <><img src={scope.row.image}  onClick={()=>{ElMessage.success('tsx渲染列')}}></img></>
      <> <el-image src={scope.row.image} preview-src-list={[scope.row.image]}/></>
      );
    }
  },
  // tsx渲染表头
  { prop:'time',
    label: "时间",
    width: 120,
    headerRender: row => {
      return (
        <el-button type='primaty' onClick={()=>{ElMessage.success('tsx渲染表头')}}>{row.label+'tsx'}</el-button>
      )
    }
  },
];

const getTableList = (params: any) => {
  return getList(params);
};
</script>
<template>
  <ElRow>
    <ElCol :span="20">
      <QiTsTable :columns="columns" :requestApi="getTableList">
      <!-- Expand -->
			<template #expand="scope">
				{{ scope.row.expand }}
			</template>
    </QiTsTable>
    </ElCol>
    <ElCol :span="4"> </ElCol>
  </ElRow>
</template>

<style lang="scss" scoped></style>
