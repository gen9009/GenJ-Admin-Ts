import service from '@/service/index'
export const loginApi = (params:any) => {
  return service.post('/api/login',params)
}
