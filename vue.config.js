let { projectName, apiName, target, newPath } = require("./vueConfig");

/********* 配置不同的参数,打包为不同的项目 start*/
process.env.VUE_APP_VERSION = projectName;
const debug = process.env.NODE_ENV !== "production";
/********* 配置不同的参数,打包为不同的项目 end*/

module.exports = {
  publicPath: `/${projectName}`, // 基本路径
  outputDir: projectName, // 打包后文件夹名字
  productionSourceMap: debug, // 是否生成map映射文件
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  devServer: {
    proxy: {
      [`/${apiName}`]: {
        target,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [`^/${apiName}`]: newPath
        }
      }
    }
  },
  chainWebpack: config => {
    /* 使用less文件的配置 start */
    config.node.set("fs", "empty");
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          // 需要插入的文件路径
          patterns: "./src/assets/less/*.less"
        })
        .end();
    });
    /* 使用less文件的配置 end */
  },
  configureWebpack: () => {
    return {
      // 解决debugger不准问题
      devtool: "source-map"
    };
  }
};
