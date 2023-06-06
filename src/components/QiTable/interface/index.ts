import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
export type SearchType =
  | 'input'
  | 'select'
  | 'select-v2' //虚拟select
  // | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch';

export interface SearchProps {
  el: SearchType; // 当前项搜索的类型
  key?: any; //搜索字段 默认会取 column prop
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  span?: number; //所占列数
  order?: number; //[problem] 目前使用JS方式排序 非Gird和Flex 搜索项从小到大排序
  defaultValue?: any; //搜索默认值
}
export interface DictEnum {
  code: number;
  value: string;
}
//定义column配置项
export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, 'children' | 'renderHeader' | 'renderCell'>> {
  tag?: boolean; // 是否是标签展示
  isShow?: boolean; // 是否显示在表格当中
  search?: SearchProps | undefined; // 搜索项配置
  dict?: DictEnum[] | ((params?: any) => Promise<any>); // 枚举类型（渲染值的字典）
  // isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  // fieldNames?: { label: string; value: string }; // 指定 label && value 的 key 值
  headerRender?: (row: ColumnProps) => any; // 自定义表头内容渲染（tsx语法）
  render?: (scope: { row: T }) => any; // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[]; // 多级表头
}
