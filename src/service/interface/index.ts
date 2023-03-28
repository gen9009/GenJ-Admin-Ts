import type { AxiosRequestConfig,InternalAxiosRequestConfig,AxiosResponse } from "axios"
/* 
  单例拦截 请求和响应
*/
export interface SingleRequestInterceptors {
  requsetResolve?:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig;
  requsetCatch?:((error: any) => any) | null;
  responseResolve?:(config:AxiosResponse)=>AxiosResponse;
  responseCatch?:((error: any) => any) | null
}
/* 
 单例拦截器参数 interceptors 继承至 AxiosRequestConfig
 方便 每个单例在 request.use 去使用 interceptors
*/
export interface SingleAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?:SingleRequestInterceptors
}
