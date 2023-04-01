import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { SingleAxiosRequestConfig, SingleRequestInterceptors, ResultData } from '@/service/interface/index';

//请求类
export default class RequestHttp {
  service: AxiosInstance;
  interceptors?: SingleRequestInterceptors;
  constructor(config: SingleAxiosRequestConfig) {
    this.service = axios.create(config);
    this.interceptors = config?.interceptors;

    //实例请求→类请求→实例响应→类响应
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log('🚀::::::🐶', '请求拦截成功');
        return config;
      },
      (error: AxiosError) => {
        console.log('🚀::::::🐶', '请求拦截错误');
        return Promise.reject(error);
      }
    );
    this.service.interceptors.request.use(this.interceptors?.requsetInterceptors, this.interceptors?.requsetInterceptorsCatch);
    this.service.interceptors.response.use(this.interceptors?.responseInterceptors, this.interceptors?.responseInterceptorsCatch);
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('🚀::::::🐶', '响应拦截成功');
        const { data } = response;
        return data;
      },
      (error: AxiosError) => {
        console.log('🚀::::::🐶', '响应错误拦截');
        return Promise.reject(error);
      }
    );
  }
  requset<T>(config: SingleAxiosRequestConfig<ResultData<T>>): Promise<ResultData<T>> {
    return new Promise((resolve, reject) => {
      //执行 自定义的请求拦截
      config.interceptors?.requsetInterceptors && !!(config = config.interceptors?.requsetInterceptors(config as InternalAxiosRequestConfig));
      this.service
        .request<any, ResultData<T>>(config)
        .then(res => {
          //执行 自定义的响应拦截
          config.interceptors?.responseInterceptors && !!(res = config.interceptors.responseInterceptors(res));
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  // 请求类型封装
  get<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config });
  }
  post<T>(url: string, params: object, config = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, config);
  }
  put<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, config);
  }
  delete<T>(url: string, params?: any, config = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config });
  }
}
