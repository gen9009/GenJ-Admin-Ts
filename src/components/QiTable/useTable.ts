// 分页查询逻辑
import { computed, reactive, toRefs } from 'vue';

/**
 *  @param {Funtion} api 获取表格数据api方法(必传)
 **/
export const useTable = (api: (params: any) => Promise<any>) => {
  const state = reactive({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      pageNum: 1, //当前页数
      pageSize: 10, //每页条数
      total: 0 //当前总数
    },
    //查询参数
    searchParams: {} as { [key: string]: any },
    // 总参数(包含分页和查询参数)
    totalParam: {}
  });
  //分页参数
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum, //当前页数
        pageSize: state.pageable.pageSize //每页条数
      };
    },
    set: val => {
      console.log('🚀::::::🐶分页更新之后的值', val);
    }
  });
  const getTableList = async () => {
    try {
      //进行查询前 合并搜索参数
      Object.assign(state.totalParam, pageParam.value);
      let { data } = await api({ ...state.totalParam });
      state.tableData = data?.list;
      //更新分页模块参数
      let { total, pageNum, pageSize } = data;
      Object.assign(state.pageable, { total, pageNum, pageSize });
    } catch (error) {
      console.log('🚀::::::🐶', error);
    }
  };
  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam: { [key: string]: any } = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParams) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParams[key] || state.searchParams[key] === false || state.searchParams[key] === 0) {
        nowSearchParam[key] = state.searchParams[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam, pageParam.value);
  };
  /**
   * @description 表格数据搜索
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };
  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParams = {};
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 分页钩子🪝 每页页码改变时
   * @return void
   * */
  const handleSizeChange = (size: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = size;
    getTableList();
  };
  /**
   * @description 分页钩子🪝 页码改变时
   * @return void
   * */
  const handleCurrentChange = (num: number) => {
    state.pageable.pageNum = num;
    getTableList();
  };
  return {
    ...toRefs(state),
    search,
    reset,
    getTableList,
    handleSizeChange,
    handleCurrentChange
  };
};
