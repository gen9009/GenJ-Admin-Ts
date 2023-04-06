import { TableColumnCtx  } from "element-plus/es/components/table/src/table-column/defaults";


//定义column配置项
export interface ColumnProps<T=any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderHeader" | "renderCell">>{
  tag?: boolean; // 是否是标签展示
	isShow?: boolean; // 是否显示在表格当中
	// search?: SearchProps | undefined; // 搜索项配置
	// enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（渲染值的字典）
	// isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
	// fieldNames?: { label: string; value: string }; // 指定 label && value 的 key 值
	headerRender?: (row: ColumnProps) => any; // 自定义表头内容渲染（tsx语法）
	render?: (scope: { row: T }) => any; // 自定义单元格内容渲染（tsx语法）
	_children?: ColumnProps<T>[]; // 多级表头
}
