import type { AxiosRequestConfig,InternalAxiosRequestConfig,AxiosResponse } from "axios"
/* 
  单例拦截 请求和响应
*/
export interface SingleRequestInterceptors<T = AxiosResponse> {
  requsetInterceptors?:(config:InternalAxiosRequestConfig)=>InternalAxiosRequestConfig;
  requsetInterceptorsCatch?:((error: any) => any) | null;
  responseInterceptors?:(config:T)=>T;
  responseInterceptorsCatch?:((error: any) => any) | null
}
/* 
 单例拦截器参数 interceptors 继承至 AxiosRequestConfig
 方便 每个单例在 request.use 去使用 interceptors
*/
export interface SingleAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?:SingleRequestInterceptors<T>
}

// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}
