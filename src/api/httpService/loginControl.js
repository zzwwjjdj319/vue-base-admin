import router, { asyncRouterMap } from "@/router";
import store from "@/store";
import { getRoleJson } from "@/api/httpService/common";
router.beforeEach(async (to, from, next) => {
  if (to.path.toLowerCase() == "/login") {
    next();
  } else {
    let { state, commit } = store;
    // 如果添加过直接next()
    if (state.isAddRouter) {
      next();
    }
    // 如果没添加
    else {
      try {
        let token = localStorage.getItem("admin_token");
        if (token) {
          // 从接口获取权限列表
          let roleList = await getRoleJson(token);
          let list = _getRoleList(asyncRouterMap, roleList);
          // console.log("控制权限", list);
          router.addRoutes(list);
          // 改变状态，表示已经配置过权限
          commit("update", { name: "isAddRouter", value: true });
          // 把筛选后的权限存入vuex里，用于渲染左侧菜单
          commit("update", { name: "asyncRoutes", value: list });
          next({ path: list[0].children[0].path });
        } else {
          next({ path: "Login" });
        }
      } catch (e) {
        next({ path: "Login" });
        console.log(e);
      }
    }
  }
});

/**
 * 递归判断路由，删除没有的权限
 * @param {Array} tree // 系统所有路由树
 * @param {Array} roles // 后端返回的权限列表
 * @return Array
 */
function _getRoleList(tree, roles) {
  let finalTree = [...tree];
  let fun = list => {
    for (let i = 0; i < list.length; i++) {
      let c = list[i];
      if (roles.findIndex(d => d.path == c.path) > -1 || c.hidden) {
        if (c.children && c.children.length) {
          fun(c.children);
        }
      } else {
        let {
          meta: { children }
        } = c;
        if (children && children.length) {
          let isHave = children.findIndex(e => roles.findIndex(f => f.path == e) > -1);
          console.log(isHave);
          // 如果不存在-删除，如果存在-继续递归
          if (isHave == -1) {
            console.log("删除", c);
            list.splice(i, 1);
            i--;
          } else {
            if (c.children && c.children.length) {
              fun(c.children);
            }
          }
        } else {
          console.log("删除", c);
          list.splice(i, 1);
          i--;
        }
      }
    }
  };
  fun(finalTree);
  return finalTree;
}
