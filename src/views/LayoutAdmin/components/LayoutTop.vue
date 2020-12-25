<template>
  <div class="layout-top p-a">
    <div class="title-box">XXXX后台系统</div>
    <div class="userinfo-box">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link c-p color-white-10"> xxxx<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout-top",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    handleCommand() {
      this.$router.push({ path: "Login" });
      this.$store.commit("update", { name: "isAddRouter", value: false });
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.layout-top {
  width: 100%;
  box-sizing: border-box;
  height: 80px;
  background-color: #042a3c;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  align-items: center;
  .title-box {
    height: 40px;
    width: 400px;
    color: #ffffff;
    font-size: 30px;
  }
  .userinfo-box {
    display: flex;
    align-items: center;
    .el-dropdown {
      margin-left: 10px;
    }
  }
}
</style>
