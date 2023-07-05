<template>
  <el-tree :data="modelValue" default-expand-all show-checkbox node-key="id" :expand-onClick-node="false" :renderContent="renderContent" />
</template>
<script setup lang="tsx">
import { ElMessage } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ref, VNode } from 'vue';

export interface Tree {
  id?: number;
  label?: string;
  isEdit?: boolean;
  level?: number;
  children?: Tree[];
}
interface EditorTreeEmits {
  (e: 'remove', value: any): void;
  (e: 'update', value: any): void;
  (e: 'append', value: any): void;
  (e: 'confirm', value: any): void;
}
interface EditorTreeProps {
  modelValue: Tree[];
  bord?: boolean;
}
const emits = defineEmits<EditorTreeEmits>();
withDefaults(defineProps<EditorTreeProps>(), {});
const isEdit = ref(false);
const selectId = ref<Tree['id'] | null>(null);
const selectLevel = ref<Tree['id'] | null>(null);
const editName = ref<string>('');
const isSelect = (data: Tree) => {
  return data.id === selectId.value && data.level === selectLevel.value;
};
const update = (node: Node, data: Tree, e: Event) => {
  e.stopPropagation();
  if (isEdit.value) return ElMessage.warning('有正在编辑或添加的选项未完成！');
  isEdit.value = true;
  selectId.value = data.id;
  selectLevel.value = data.level;
  editName.value = data.label!;
  isEdit.value = true;
  emits('update', { node, data });
};

const remove = (node: Node, data: Tree, e: Event) => {
  e.stopPropagation();
  console.log('🚀::::::🐶💩', 'remove');
  if (isEdit.value) return ElMessage.warning('有正在编辑或添加的选项未完成！');
  emits('remove', { node, data });
};

const append = (node: Node, data: Tree, e: Event) => {
  e.stopPropagation();
  if (isEdit.value) return ElMessage.warning('有正在编辑或添加的选项未完成！');
  selectId.value = data.id;
  editName.value = '';
  const newChild = { label: '', isEdit: true };
  isEdit.value = true;
  if (!data.children) {
    data.children = [];
  }
  console.log('🚀::::::🐶💩', 'append');
  emits('append', { node, data });
  data.children.unshift(newChild);
};
const close = (node: Node, data: Tree, e: Event) => {
  e.stopPropagation();
  if (!data.id) {
    node.parent.data.children.forEach((item: Tree, i: number) => {
      if (!item.id) {
        node.parent.data.children.splice(i, 1);
      }
    });
  }
  selectId.value = null;
  selectLevel.value = null;
  editName.value = data.label!;
  isEdit.value = false;
};
const nameChange = (node: Node, data: Tree, e: KeyboardEvent) => {
  e.stopPropagation();
  editName.value = (e.target as HTMLInputElement)!.value;
  if (e.keyCode == 13) {
    confirm(node, data, e);
  }
};
const confirm = (node: Node, data: Tree, e: Event) => {
  e.stopPropagation();
  // 可以根据 data.id 判断 tree的新增和编辑
  emits('confirm', { editName, node, data });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderContent = (h: () => VNode, { node, data, store }: { node: Node; data: Tree; store: Node['store'] }) => {
  return (
    <span class="qi-tree-node">
      {(isEdit.value === true && isSelect(data)) || data.isEdit ? <input placeholder="名称不能为空" class="ly-edit__text" onKeyup={(e: KeyboardEvent) => nameChange(node, data, e)} v-model={editName.value} /> : <span>{data.label}</span>}
      {(isEdit.value === true && isSelect(data)) || data.isEdit ? getEditContent(h, node, data) : getDefaultContent(h, node, data)}
    </span>
  );
};
const getDefaultContent = (h: () => VNode, node: Node, data: Tree) => {
  return (
    <div class="ly-visible">
      {
        <span>
          {data.level! >= 0 && (
            <el-button size="small" link text onClick={(e: Event) => update(node, data, e)}>
              <el-icon>
                <i-ep-edit />
              </el-icon>
            </el-button>
          )}

          {data.level! >= 0 && (
            <el-button size="small" link onClick={(e: Event) => append(node, data, e)}>
              <el-icon>
                <i-ep-circlePlusFilled />
              </el-icon>
            </el-button>
          )}

          {data.level! >= 0 && (
            <el-button size="small" link onClick={(e: Event) => remove(node, data, e)}>
              <el-icon>
                <i-ep-deleteFilled />
              </el-icon>
            </el-button>
          )}
        </span>
      }
    </div>
  );
};
const getEditContent = (h: () => VNode, node: Node, data: Tree) => {
  return (
    <span class="ly-visible">
      <el-button size="small" onClick={(e: Event) => close(node, data, e)}>
        取消
      </el-button>
      <el-button size="small" onClick={(e: Event) => confirm(node, data, e)}>
        确认
      </el-button>
    </span>
  );
};
</script>
<style lang="scss">
@import './style.scss';
</style>
