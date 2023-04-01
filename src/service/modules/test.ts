import service from '@/service/index'
import { ReqTestParams } from '../interface/reqType'
import { ResTest } from '../interface/resType'
export const testApi = (params:ReqTestParams) => {
  // return service.get<ResTest>('/api/test',params)
  return service.requset<ResTest>({
    url:'/api/test',
    params,
    interceptors:{
      requsetInterceptors:(config)=>{console.log('🚀::::::🐶','test单一接口请求拦截');return config},
      responseInterceptors:(res)=>{console.log('🚀::::::🐶','test单一接口响应拦截');return res}
    }
  })
}

