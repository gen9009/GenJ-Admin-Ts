import axios, {  AxiosInstance,InternalAxiosRequestConfig,AxiosResponse,AxiosError } from 'axios';
import { SingleAxiosRequestConfig,SingleRequestInterceptors } from '@/service/interface/index';
//请求类
export default class RequestHttp {
  service: AxiosInstance
  interceptors:SingleRequestInterceptors|undefined
  constructor(config:SingleAxiosRequestConfig) {
    this.service = axios.create(config);
    this.interceptors = config.interceptors
    this.service.interceptors.request.use(
      this.interceptors?.requsetResolve,
      this.interceptors?.requsetCatch
    )
    this.service.interceptors.response.use(
      this.interceptors?.responseResolve,
      this.interceptors?.responseCatch
    )
    /* 
    请求拦截
    */
    this.service.interceptors.request.use(
      (config:InternalAxiosRequestConfig)=> {
        console.log('🚀::::::🐶','请求拦截成功')
        return config;
      },
      (error:AxiosError) => {
        console.log('🚀::::::🐶','请求拦截错误')
        return Promise.reject(error);
      }
    );
    /* 
      响应拦截 
    */
    this.service.interceptors.response.use(
      (response :AxiosResponse)=> {
        console.log('🚀::::::🐶','响应拦截成功')
        const { data } = response;
        return data;
      },
     (error:AxiosError) => {
      console.log('🚀::::::🐶','响应错误拦截')
        return Promise.reject(error);
      }
    );
  }

  // 请求类型封装
  get(url: string, params?: object) {
    return this.service.get(url, params);
  }
  post(url: string, params: object) {
    return this.service.post(url, params);
  }
  put(url: string, params: object) {
    return this.service.put(url, params);
  }
  delete(url:string, params:object) {
		return this.service.delete(url, params);
	}
}

