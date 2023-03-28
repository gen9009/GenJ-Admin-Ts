import RequestHttp from "./service";
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
/* 
  封装思路
  1、每个实例 拥有单独的拦截器
  2、每个实例 共享相同的拦截器
  3、常规的配置 baseURL timeout
*/

const config = {
 // 默认请求 通过环境变量设置
  baseURL: import.meta.env.VITE_API_URL as string,
  //设置超时时间
  timeout: 1000 * 60,
  //跨域允许携带凭证
  withCredentials: true,
  interceptors:{
    requsetResolve:(config:InternalAxiosRequestConfig)=>{console.log('🚀::::::🐶','自定义请求拦截成功');return config},
    requsetCatch:(error:any)=>{console.log('🚀::::::🐶','自定义请求拦截失败');return error},
    responseResolve:(config:AxiosResponse)=>{console.log('🚀::::::🐶','自定义响应拦截成功');return config},
    responeCatch:(error:any)=>{console.log('🚀::::::🐶','自定义请求拦截成功');return error}
  }
};

export default new RequestHttp( config )
