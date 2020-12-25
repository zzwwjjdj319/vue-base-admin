import Vue from "vue";
import VueRouter from "vue-router";
import LayoutAdmin from "@/views/LayoutAdmin";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Login", // 登陆页
    name: "Login",
    hidden: true,
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: "/", // 登陆页
    redirect: "Login"
  }
];

// meta下的children是其下面所有children的path列表，避免筛选权限的时候2次递归。
export const asyncRouterMap = [
  {
    path: "/MemberManager",
    component: LayoutAdmin,
    meta: { title: "组织架构", icon: "el-icon-menu", children: ["/MemberManager", "/DepartmentManager"] },
    children: [
      {
        path: "/MemberManager", // 成员管理
        name: "MemberManager",
        component: () => import("@/views/Organization/MemberManager/index.vue"),
        meta: { title: "成员管理", icon: "el-icon-s-custom" }
      },
      {
        path: "/DepartmentManager", // 部门管理
        name: "DepartmentManager",
        component: () => import("@/views/Organization/DepartmentManager/index.vue"),
        meta: { title: "部门管理", icon: "el-icon-s-platform" }
      }
    ]
  },
  {
    path: "/PermissionManager",
    component: LayoutAdmin,
    meta: { title: "权限配置", icon: "el-icon-menu", children: ["/PermissionManager", "/RoleManager", "/UserManager"] },
    children: [
      {
        path: "/PermissionManager", // 权限管理
        name: "PermissionManager",
        component: () => import("@/views/Permission/PermissionManager/index.vue"),
        meta: { title: "权限管理", icon: "el-icon-circle-plus" }
      },
      {
        path: "/RoleManager", // 角色管理
        name: "RoleManager",
        component: () => import("@/views/Permission/RoleManager/index.vue"),
        meta: { title: "角色管理", icon: "el-icon-s-goods" }
      },
      {
        path: "/UserManager", // 用户管理
        name: "UserManager",
        component: () => import("@/views/Permission/UserManager/index.vue"),
        meta: { title: "用户管理", icon: "el-icon-warning" }
      }
    ]
  },
  {
    path: "/LoginLogs",
    component: LayoutAdmin,
    meta: { title: "日志管理", icon: "el-icon-menu", children: ["/LoginLogs", "/OperationLogs"] },
    children: [
      {
        path: "/LoginLogs", // 登陆日志
        name: "LoginLogs",
        component: () => import("@/views/Logs/LoginLogs/index.vue"),
        meta: { title: "登陆日志", icon: "el-icon-s-order" }
      },
      {
        path: "/OperationLogs", // 操作日志
        name: "OperationLogs",
        component: () => import("@/views/Logs/OperationLogs/index.vue"),
        meta: { title: "操作日志", icon: "el-icon-s-cooperation" }
      }
    ]
  },
  {
    // 404 统一跳转到index页
    path: "*",
    redirect: "Login",
    hidden: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
