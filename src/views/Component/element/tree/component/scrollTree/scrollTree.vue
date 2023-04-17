<template>
  <div class="scroll-container">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>
<script setup lang="ts">
interface Tree {
  label: string;
  children?: Tree[];
}
const handleNodeClick = (data: Tree) => {
  console.log(data);
};
const defaultProps = {
  children: 'children',
  label: 'label'
};
const treeChildren = [
  {
    label: 'Level two 1-1',
    children: [
      {
        label: 'Level three 1-1-1'
      }
    ]
  }
];
const data: Tree[] = [
  {
    label: '我就要超出去我就要超出去我就要超出去我就要超出去我就要超出去',
    children: treeChildren
  },
  {
    label: 'Level one 2',
    children: treeChildren
  },
  {
    label: 'Level one 3',
    children: treeChildren
  },
  {
    label: 'Level one 4',
    children: treeChildren
  },
  {
    label: 'Level one 5',
    children: treeChildren
  },
  {
    label: 'Level one 6',
    children: treeChildren
  },
  {
    label: 'Level one 7',
    children: treeChildren
  }
];
</script>
<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  overflow: auto;
  height: 100%;
  :deep(.el-tree) {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  :deep(.el-tree > .el-tree-node) {
    display: inline-block;
    min-width: 100%;
  }
}
</style>
