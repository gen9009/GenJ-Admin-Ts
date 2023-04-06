// 分页查询逻辑
import { computed, reactive, toRefs } from "vue"

/** 
  *  @param {Funtion} api 获取表格数据api方法(必传)
**/
export const useTable = (api:(params:any)=>Promise<any>)=>{
  const state = reactive({
    // 表格数据
    tableData:[],
    // 分页数据
    pageable:{
      pageNum:1,//当前页数
      pageSize:10,//每页条数
      total:0//当前总数
    },
    //查询参数
    searchParams:{},
    // 总参数(包含分页和查询参数)
		totalParam: {}
  })
  //分页参数
  const pageParam = computed({
    get:()=>{
      return {
        pageNum:state.pageable.pageNum,//当前页数
        pageSize:state.pageable.pageSize//每页条数
      }
    },
    set:(val)=>{
      console.log('🚀::::::🐶分页更新之后的值',val)
    }
  })
  const getTableList = async () => {
    try {
      //进行查询前 合并搜索参数
      Object.assign(state.totalParam,pageParam.value)
      let { data } = await api({...state.totalParam})
      state.tableData = data?.list
      //更新分页模块参数
      let { total, pageNum, pageSize} = data
      Object.assign(state.pageable,  { total, pageNum, pageSize} );
    } catch (error) {
      console.log('🚀::::::🐶',error)
    }
  }

  const search = (params:any) =>{
    //处理搜索参数
    let searchParams = {...params}
    getTableList()
  }
  const handleSizeChange = (size:number)=>{
    state.pageable.pageNum = 1;
    state.pageable.pageSize = size
    getTableList()
  }
  const handleCurrentChange = (num:number)=>{
    state.pageable.pageNum= num
    getTableList()
  }
  return {
    ...toRefs(state),
    // 搜索
    // 重置
		getTableList,
    handleSizeChange,
    handleCurrentChange,
	};
}
