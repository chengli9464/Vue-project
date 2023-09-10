// axios 基础配置封装
// 1、接口基地址
// 2、接口的超时事件
// 3、请求拦截器
// 4、响应拦截器
import axios from 'axios';

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 5000,
  // 添加请求头需要刷新才能带上
  headers: {
    Authority: localStorage.getItem('token'),
  },
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  // transformRequest: [
  //   (data, headers) => {
  //     headers['Authority'] = localStorage.getItem('token') ;
  //     return data;
  //   },
  // ],
});
//拦截器
// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default httpInstance;
