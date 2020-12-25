<template>
  <!-- 登陆 -->
  <div class="login">
    <div class="login-box f-r-center">
      <div class="right-login">
        <!-- 账户登录 -->
        <div class="header">账户登录</div>
        <div class="m-t20 font-16">账号：role0、role1、role2、role3</div>
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- 用户名 -->
          <el-form-item prop="acc">
            <el-input placeholder="用户名" v-model="loginForm.acc"> </el-input>
          </el-form-item>
          <!-- 账户密码 -->
          <el-form-item prop="pwd">
            <el-input @keyup.enter="loginBtn" type="password" placeholder="账户密码" v-model="loginForm.pwd">
            </el-input>
          </el-form-item>
          <!-- 记住密码 -->
          <el-form-item>
            <div class="checkbox f-r a-c m-t10">
              <input type="checkbox" value="remember-me" v-model="rememberPassword" id="remember-password" />
              <label class="font-14 m-l10" for="remember-password">
                记住密码
              </label>
            </div>
          </el-form-item>
          <!-- 登录 -->
          <el-form-item>
            <el-button type="primary" @click="loginBtn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      loginForm: {
        acc: "role0",
        pwd: "123456"
      },
      rules: {
        acc: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      },
      rememberPassword: false
    };
  },
  created() {},
  mounted() {
    console.log(this.$router, this.$route);
  },
  beforeDestroy() {},
  computed: {},
  methods: {
    loginBtn() {
      let { acc } = this.loginForm;
      // 账号当成登陆后获取的token，存入localStorage，用于页面刷新时获取权限列表
      if (acc) localStorage.setItem("admin_token", acc);
      this.$router.push({ path: "MemberManager" });
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
    // 如果from.name存在，刷新页面，解决退出登陆后，添加的动态路由无法删除问题。
    // 注：一定要在next()以后执行
    if (from.name) {
      location.href = location.href + "";
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.login {
  background-color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    overflow: hidden;
    width: 50%;
    height: 60%;
    display: flex;
    // border-top-right-radius: 150px;
    // border-bottom-left-radius: 150px;
    .left-bg {
      flex: 1;
      height: 100%;
    }
    .right-login {
      box-sizing: border-box;
      height: 100%;
      width: 400px;
      background-color: #fff;
      padding: 60px 50px;
      .header {
        font-size: 28px;
        font-weight: 300px;
      }
      .el-form {
        margin-top: 90px;
        .el-form-item {
          width: 100%;
          /deep/.el-form-item__content {
            margin-left: 0 !important;
            .el-input__prefix {
              display: flex;
              justify-content: center;
              align-items: center;
              padding-right: 15px;
            }
            // .el-input {
            //   padding: 0 15px;
            // }
          }
          .el-input__inner {
            padding-left: 60px;
            overflow: hidden;
            border: 1px solid #d4dfe0;
          }
          /deep/.el-input__inner:focus {
            border-color: #073b55;
          }
          .el-input__inner::input-placeholder {
            color: #073b55;
          }
          .el-button {
            width: 100%;
            border-radius: 20px;
            background-color: rgba(7, 59, 85, 0.863);
          }
          /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
            color: #073b55;
          }
          .el-button:hover {
            background-color: #073b55;
            color: #ffffff;
          }
          .checkbox {
            input {
              width: 15px;
              height: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
