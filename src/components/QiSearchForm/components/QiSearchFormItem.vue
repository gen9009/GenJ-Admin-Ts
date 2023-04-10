<script setup lang="tsx">
// 如果全局引入则不需导入 如果是自动导入和按需导入则需要导入
import { ElInput, ElSelect, ElSelectV2 } from 'element-plus';
import { ColumnProps, SearchType } from '@/components/QiTable/interface';

interface SearchFormItemProps {
  column: ColumnProps;
  searchParams: { [key: string]: any };
}
const props = withDefaults(defineProps<SearchFormItemProps>(), {
  column: () => ({}),
  searchParams: () => ({})
});
console.log('🚀::::::🐶', props.column, 123123123123123);

const renderFormItem = (column: ColumnProps) => {
  switch (column.search?.el!) {
    case 'input':
      return renderInput(column);
    case 'select':
      return renderSelect(column);
    case 'select-v2':
      return renderSelectV2(column);
    case 'tree-select':
      return renderInput(column);
    case 'cascader':
      return renderInput(column);
    case 'date-picker':
      return renderInput(column);
    case 'time-picker':
      return renderInput(column);
    case 'time-select':
      return renderInput(column);
    default:
      break;
  }
};
const renderInput = (column: ColumnProps) => {
  return <ElInput v-model={props.searchParams[column.search?.key ?? column.prop]} placeholder={props.column.search?.props?.placeholder ?? '请输入'} props={handleSearchProps()} {...props.column.search?.event}></ElInput>;
};
const renderSelect = (column: ColumnProps) => {
  return (
    <>select</>
    // <ElSelect></ElSelect>
  );
};
const renderSelectV2 = (column: ColumnProps) => {
  return (
    <>select-v2</>
    // <ElSelectV2></ElSelectV2>
  );
};
// 处理search.props表单属性 透传至定义的表单中, el 为 tree-select、cascader 的时候需要给下默认 label 和 value
const handleSearchProps = () => {
  const searchProps = props.column.search?.props ?? {};
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
