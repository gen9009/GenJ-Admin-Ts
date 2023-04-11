import service from '@/service/index'
export const loginApi = (params:any) => {
  return service.post('/login',params)
}
