import http from '@/service/index.ts'
export const loginApi = (params:any) => {
  return http.post('/api/login',params)
}
