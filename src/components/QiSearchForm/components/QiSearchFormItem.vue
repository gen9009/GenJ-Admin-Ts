<script setup lang="tsx">
// 如果全局引入则不需导入 如果是自动导入和按需导入则需要导入
import { ElInput, ElSelect, ElOption, ElCascader } from 'element-plus';
import { ColumnProps, DictEnum } from '@/components/QiTable/interface';
import { inject, onBeforeMount, ref, onMounted } from 'vue';

interface SearchFormItemProps {
  column: ColumnProps;
  searchParams: { [key: string]: any };
}
onBeforeMount(() => {
  console.log('🚀::::::🐶', 'onBeforeMount');
});
onMounted(() => {
  console.log('🚀::::::🐶', 'onMounted');
});
const props = withDefaults(defineProps<SearchFormItemProps>(), {
  column: () => ({}),
  searchParams: () => ({})
});
const dictMap = inject('dictMap', ref(new Map<string, DictEnum[]>()));
// 方便自定义节点
const renderFormItem = (column: ColumnProps) => {
  switch (column.search!.el) {
    case 'input':
      return renderInput(column);
    case 'select':
      return renderSelect(column);
    case 'select-v2':
      return renderSelectV2(column);
    // case 'tree-select':
    //   return renderTreeSelect(column);
    case 'cascader':
      return renderCascader(column);
    case 'date-picker':
      return renderDatePicker(column);
    case 'time-picker':
      return renderTimePicker(column);
    case 'time-select':
      return renderTimeSelect(column);
    default:
      break;
  }
};
const renderInput = (column: ColumnProps) => {
  return <ElInput v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请输入'} {...handleSearchProps(column)}></ElInput>;
};
const renderSelect = (column: ColumnProps) => {
  return (
    <ElSelect v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)}>
      {dictMap.value.get(column.prop!)?.map(item => (
        <ElOption value={item.code} label={item.value} key={item.code}></ElOption>
      ))}
    </ElSelect>
  );
};
const renderSelectV2 = (column: ColumnProps) => {
  return (
    // @ts-ignore
    <ElSelectV2 v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)} options={(dictMap.value.get(column.prop!) ?? []).map(v => ({ value: v.code, label: v.value }))}></ElSelectV2>
  );
};
// const renderTreeSelect = (column: ColumnProps) => {
// };
const renderCascader = (column: ColumnProps) => {
  return <ElCascader v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)} options={(dictMap.value.get(column.prop!) ?? []).map(v => ({ value: v.code, label: v.value }))}></ElCascader>;
};
const renderDatePicker = (column: ColumnProps) => {
  return <el-date-picker v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)} />;
};
const renderTimePicker = (column: ColumnProps) => {
  return <el-time-picker v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)} />;
};
const renderTimeSelect = (column: ColumnProps) => {
  return <el-time-select v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={column.search?.props?.placeholder ?? '请选择'} {...handleSearchProps(column)} />;
};

// 将search.props表单属性 透传至定义的表单中, el 为 tree-select、cascader 的时候需要给下默认 label 和 value
const handleSearchProps = (column: ColumnProps) => {
  const searchProps = column.search?.props ?? {};
  return { ...searchProps };
};
const render = (column: ColumnProps) => {
  return <>{renderFormItem(column)}</>;
};
</script>
<template>
  <component :is="render(column)"></component>
</template>

<style lang="scss" scoped></style>
