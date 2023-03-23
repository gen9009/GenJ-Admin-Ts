import http from '@/service/index.ts'
export const loginApi = (params) => {
  return http.post('/api/login',params)
}
