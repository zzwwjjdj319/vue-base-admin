import axios from "axios";
import { autoMatch, checkStatus, startLoading, endLoading } from "./utils"; // 附近处理函数

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000
});

// 实例添加请求拦截
instance.interceptors.request.use(
  config => {
    // 全局或局部loading
    if (config.headers.showLoading !== false && config.showLoading !== false) {
      startLoading(config.headers.loadingTarget);
    }
    // 设置post请求头
    // instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    return config;
  },
  error => {
    //判断当前请求是否设置了不显示Loading
    if (error.config.headers.showLoading !== false) {
      endLoading();
    }
    return Promise.reject(error);
  }
);

// 实例添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false && response.config.showLoading !== false) {
      endLoading();
    }
    return checkStatus(response);
  },
  function(error) {
    let { response } = error;
    console.log("error", error);
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false && response.config.showLoading !== false) {
      endLoading();
    }
    return checkStatus(response ? response : error);
  }
);

const request = opt => {
  const options = Object.assign(
    {
      method: "get"
      // ifHandleError: true // 是否统一处理接口失败(提示)
    },
    opt
  );
  // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
  options.baseURL = autoMatch(options.prefix);
  // console.log(options);
  let res = instance(options);
  return res;
};

export default request;
