let projectName = "";
projectName = "VueAdmin";

/************ API接口代理配置 start*****/
let apiName = "api"; // 接口前缀

let target = "http://192.168.1.151:7821";

let newPath = ""; // java代码启动
newPath = `/${apiName}`; // 服务器启动
/************ API接口代理配置 end*****/

module.exports = {
  projectName,
  apiName,
  target,
  newPath
};
