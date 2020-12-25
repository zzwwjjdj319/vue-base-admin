import { Loading, Message } from "element-ui";

// 匹配接口前缀
export function autoMatch(prefix) {
  let baseUrl = "";
  switch (prefix) {
    case "api":
      baseUrl = "";
      break;
    default:
      baseUrl = "";
  }
  return baseUrl;
}

export function checkStatus(response) {
  try {
    // console.log(response);
    const status = response.status || -1000; // -1000 自己定义，连接错误的status
    let { code, data, msg, message } = response.data;
    if ((status >= 200 && status < 300) || status === 304) {
      //公司接口
      if (code == 200) {
        return data;
      } else {
        let msg2 =
          (msg == "该地址已存在！！！" ? "加载成功，服务器已有该地址，不会生成新记录！" : msg) ||
          "error_-1000：返回数据错误";
        Message.info(msg2);
        return Promise.reject(msg2);
      }
    } else {
      let errorObj = {
        "error_-1": "error_-1：远程服务响应失败,请稍后重试",
        error_400: "error_400：错误请求",
        error_401: "error_401：访问令牌无效或已过期",
        error_403: "error_403：拒绝访问",
        error_404: "error_404：资源不存在",
        error_405: "error_405：请求方法未允许",
        error_408: "error_408：请求超时",
        error_500: "error_500：访问服务失败",
        error_501: "error_501：未实现",
        error_502: "error_502：无效网关",
        error_503: "error_503：服务不可用"
      };
      errorObj[`error_${status}`]
        ? Message.error(errorObj[`error_${status}`])
        : Message.error(`error_${status}：连接错误`);
      return Promise.reject(errorObj[`error_${status}`] || `error_${status}：连接错误`);
    }
  } catch (e) {
    return Promise.reject("系统错误");
  }
}

let loading = null,
  count = 0;
//使用Element loading-start 方法
export function startLoading(target) {
  if (count === 0 && !loading) {
    loading = Loading.service({
      lock: true,
      text: "数据加载中...",
      background: "rgba(0,0,0,0.5)",
      target: target || "body"
    });
    // console.log("开起loading")
  }
  count++;
}

//使用Element loading-close 方法
export function endLoading() {
  count--;
  count = Math.max(count, 0);
  if (count == 0) {
    loading.close();
    loading = null;
    // console.log("关闭loading")
  }
}
