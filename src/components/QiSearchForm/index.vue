<script setup lang="tsx">
import { computed, ref } from 'vue';
import { ColumnProps } from '../QiTable/interface/index';
import { Delete, Search, ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
import QiSearchFormItem from './components/QiSearchFormItem.vue';
import { ElButton, ElCol } from 'element-plus';
interface TableSearchProps {
  searchColumns: ColumnProps[]; //搜索Item
  searchParams?: { [key: string]: any }; //搜索参数
  hasReset?: boolean;
  hasSearch?: boolean;
  hasCollapse?: boolean;
  search: (params: any) => void; //搜索方法
  reset: (params: any) => void; //重置方法
}
const props = withDefaults(defineProps<TableSearchProps>(), {
  searchColumns: () => [],
  searchParams: () => ({}),
  hasReset: true,
  hasSearch: false,
  hasCollapse: false
});

// 获取搜索框间距列表
const spanList = computed(() => {
  return props.searchColumns.map(v => v.search?.span ?? 6);
});

// 计算按钮间距 默认8
const buttonSpan = computed(() => {
  return 8 - (props.hasReset ? 0 : 2) - (props.hasSearch ? 0 : 2) - (props.hasCollapse ? 0 : 2);
});

// 计算单行时 最后一个column索引
const breakColIndex = computed(() => {
  let residueSpan = 24 - buttonSpan.value; //单行剩余量
  let endIndex = 0; //断点column索引
  spanList.value.reduce((pre, cur, curIndex) => {
    if ((pre += cur) < residueSpan) {
      endIndex = Math.max(curIndex, 0);
    }
    return pre;
  }, 0);
  return endIndex;
});
// 计算按钮偏移量offset
const buttonOffet = computed(() => {
  if (collapsed.value) {
    // 两种方案 1、指定需要展示的搜索框 2、动态计算应该展示的搜索框
    // 目前选择 第二种
    let residueSpan = 24 - buttonSpan.value; //单行剩余量
    return residueSpan - spanList.value.slice(0, breakColIndex.value + 1).reduce((pre, cur) => (pre += cur), 0);
  } else {
    return 24 - (spanList.value.reduce((pre, cur) => (pre += cur), 0) % 24) - buttonSpan.value;
  }
});
// 判断是否存在展开 间距总数大于（24-按钮间距）代表存在
const showCollapse = computed(() => {
  return spanList.value.reduce((pre, cur) => (pre += cur), 0) > 24 - buttonSpan.value;
});
// 是否默认折叠搜索项
const collapsed = ref(true);

//动态渲染重置搜索按钮
const renderSearchButton = () => {
  return (
    <ElCol span={buttonSpan.value} offset={buttonOffet.value}>
      <div class="operation" style="display:flex;justify-content:end;">
        <ElButton icon={Delete} onClick={props.reset}>
          重置
        </ElButton>
        <ElButton type="primary" icon={Search} onClick={props.search}>
          搜索
        </ElButton>
        {props.hasCollapse && showCollapse.value && (
          <ElButton link plain icon={collapsed.value ? ArrowDownBold : ArrowUpBold} onClick={() => (collapsed.value = !collapsed.value)}>
            {collapsed.value ? '展开' : '合并'}
          </ElButton>
        )}
      </div>
    </ElCol>
  );
};
</script>
<template>
  <div class="table-search" v-if="searchColumns.length">
    <el-form :model="searchParams">
      <ElRow :gutter="16">
        <!-- 搜索Item -->
        <template v-bind="item" v-for="(item, index) in searchColumns" :key="item.prop">
          <ElCol :span="item.search?.span ?? 6" v-show="!collapsed || (collapsed && index <= breakColIndex)">
            <div class="qi-search-form-item">
              <el-form-item :label="item.label">
                <QiSearchFormItem :column="item" :searchParams="searchParams"></QiSearchFormItem>
              </el-form-item>
            </div>
          </ElCol>
        </template>
        <component :is="renderSearchButton()"></component>
      </ElRow>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
