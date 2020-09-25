import axios from "axios"; // 引入axios
// import qs from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import config from "../config";
import router from '../router'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 5000; // 设置请求超时
axios.defaults.baseURL = config.baseURL; // 默认请求地址

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("token");
    if (token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // Bearer是JWT的认证头部信息
        config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  res => {
    return res.data;
  }, // data数据
  error => {
    if(error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.removeItem('token')
          Vue.prototype.$confirm({
            content: '未登陆或登陆过期',
            onOk() {
              router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
              })
            },
            okText: '前往登陆',
            cancelText: '取消',
          })
          
          
      }
    }
    
    return Promise.reject(error.response)
  }
);

export const genPostReq = url => (...params) => axios.post(url, ...params);
