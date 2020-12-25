// import request from "../";
let roleList = {
  role0: [
    { path: "/MemberManager" },
    { path: "/DepartmentManager" },
    { path: "/LoginLogs" },
    { path: "/OperationLogs" },
    { path: "/UserManager" },
    { path: "/PermissionManager" },
    { path: "/RoleManager" }
  ],
  role1: [
    { path: "/MemberManager" },
    { path: "/DepartmentManager" },
    { path: "/LoginLogs" },
    { path: "/UserManager" },
    { path: "/PermissionManager" },
    { path: "/RoleManager" }
  ],
  role2: [{ path: "/MemberManager" }, { path: "/DepartmentManager" }],
  role3: [{ path: "/LoginLogs" }, { path: "/OperationLogs" }]
};

/**
 *  role0 // 所有权限
 *  role1 // 没有操作日志权限
 *  role2 // 只有组织架构权限
 *  role3 // 只有日志权限
 *
 * -----------假设这是调用接口返回的权限列表-------------
 */
export const getRoleJson = url => {
  return new Promise(resolve => {
    return resolve(roleList[url] || roleList.role0);
  });
};
