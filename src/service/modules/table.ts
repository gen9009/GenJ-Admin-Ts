import service from '@/service/index'
export const getList = (params:any) => {
  return service.get('/getList',params)
}
