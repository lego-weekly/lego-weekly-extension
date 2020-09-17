import axios from "axios"; // 引入axios
// import qs from "qs"; // 引入qs模块，用来序列化post类型的数据，后面会提到
import config from "../config";

// axios 配置
axios.defaults.timeout = 5000; // 设置请求超时
axios.defaults.baseURL = config.baseURL; // 默认请求地址

axios.interceptors.request.use(
  config => {
    console.log("请求config", config);
    if (config.method === "post") {
      // config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  res => {
    return res.data;
  }, // data数据
  error => Promise.reject(error)
);

export const genPostReq = url => (...params) => axios.post(url, ...params);
