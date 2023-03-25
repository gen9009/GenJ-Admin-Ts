import axios, { AxiosRequestConfig, AxiosInstance,InternalAxiosRequestConfig,AxiosResponse,AxiosError } from 'axios';



const config = {
 // 默认请求 通过环境变量设置
  baseURL: import.meta.env.VITE_API_URL as string,
  //设置超时时间
  timeout: 1000 * 60,
  //跨域允许携带凭证
  withCredentials: true
};

//请求类
class RequestHttp {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    /* 
    请求拦截
    */
    this.service.interceptors.request.use(
      (config:InternalAxiosRequestConfig)=> {
        return config;
      },
      (error:AxiosError) => {
        return Promise.reject(error);
      }
    );
    /* 
      响应拦截 
    */
    this.service.interceptors.response.use(
      (response :AxiosResponse)=> {
        const { data } = response;
        return data;
      },
     (error:AxiosError) => {
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

export default new RequestHttp(config)
