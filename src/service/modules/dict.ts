import service from '@/service/index'
export const getDictApi = (params?:any) => {
  return service.get('/testDict',params)
}
