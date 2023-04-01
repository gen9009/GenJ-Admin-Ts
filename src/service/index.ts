import RequestHttp from "./service";
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/* 
  封装思路
  1、每个实例 共享相同的类拦截器
  2、每个实例 拥有单独的实例拦截器(可能在后续项目中存在多个new RequestHttp)
  3、每个单一接口 自定义拦截器
  4、常规的配置 baseURL timeout
*/

const config = {
 // 默认请求 通过环境变量设置
  baseURL: import.meta.env.VITE_API_URL as string,
  //设置超时时间
  timeout: 1000 * 60,
  //跨域允许携带凭证
  withCredentials: true,
  interceptors:{
    requsetInterceptors:(config:InternalAxiosRequestConfig)=>{console.log('🚀::::::🐶','实例请求拦截成功');return config},
    requsetInterceptorsCatch:(error:any)=>{console.log('🚀::::::🐶','实例请求拦截失败');return error},
    responseInterceptors:(config:AxiosResponse)=>{console.log('🚀::::::🐶','实例响应拦截成功');return config},
    responseInterceptorsCatch:(error:any)=>{console.log('🚀::::::🐶','实例请求拦截成功');return error}
  }
};

export default new RequestHttp( config )
