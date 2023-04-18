<script setup lang="tsx">
import { useSlots } from 'vue';
import { ColumnProps } from '../interface/index';
import { ElTableColumn } from 'element-plus';
defineProps<{ column: ColumnProps }>();

const slots = useSlots();

const renderLoop = (item: ColumnProps) => {
  return (
    <ElTableColumn {...item} align={item.align ?? 'center'} showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}>
      {/* vue3 tsx 插槽语法 -- 对应el-table-column 的slots */}
      {{
        default: (scope: any) => {
          {
            /*存在自定义Render时 */
          }
          if (item.render) return item.render(scope);
          {
            /*存在插槽时  Slot = (...args: any[]) => VNode[]; */
          }
          if (slots[item.prop!]) return slots[item.prop!]!(scope);
          {
            /* [problem] 为什么对象不会被渲染 undefined会渲染但为该属性值 */
          }
          {
            /* return undefined {a:1} */
          }
          return scope.row[item.prop!] ?? '--';
        },
        header: () => {
          if (item.headerRender) return item.headerRender(item);
          return item.label;
        }
      }}
    </ElTableColumn>
  );
};
</script>
<template>
  <component :is="renderLoop(column)"></component>
</template>
<style lang="scss" scoped></style>
