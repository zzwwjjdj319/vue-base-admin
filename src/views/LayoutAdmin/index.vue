<template>
  <div class="LayoutAdmin w-100 h-100 f-r">
    <LayoutTop />
    <div class="man f-r">
      <el-scrollbar wrap-class="scrollbar-wrapper" class="f-n">
        <el-menu
          :default-active="activeMenu"
          :collapse="false"
          :background-color="'#042a3c'"
          :text-color="'#e4f6ff'"
          :unique-opened="false"
          :active-text-color="'#ffffff'"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
      <transition name="fade-transform" mode="out-in">
        <router-view class="w-100" />
      </transition>
    </div>
  </div>
</template>

<script>
import SidebarItem from "./components/SidebarItem";
import { mapMutations } from "vuex";
import LayoutTop from "./components/LayoutTop";
export default {
  name: "LayoutAdmin",
  props: {},
  data() {
    return {};
  },
  components: {
    SidebarItem,
    LayoutTop
  },
  created() {},
  mounted() {
    // this.update({ name: "active", value: 3 });
  },
  beforeDestroy() {},
  computed: {
    routes() {
      // console.log("this.$router", this.$router);
      // return this.$router.options.routes;
      console.log("this.$store.state", this.$store.state);
      return this.$store.state.asyncRoutes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  methods: {
    ...mapMutations(["update"])
  }
};
</script>

<style lang="less" scoped>
.LayoutAdmin {
  width: 100%;
  height: 100%;
  /deep/ .el-menu-item {
    margin: 0 10px;
    border-radius: 5px;
  }
  /deep/.adminVideo {
    width: 16px;
    height: 18px;
  }
  /deep/ .is-active {
    background-color: fade(#00fffc, 30) !important;
  }
  /deep/.el-scrollbar {
    width: 300px;
    height: 100%;
  }
  /deep/ .el-scrollbar__view {
    width: 301px;
  }
  /deep/.scrollbar-wrapper {
    overflow-x: hidden !important;
    height: 100%;
    background-color: #042a3c;
  }
  .man {
    margin-top: 80px;
    width: 100%;
    height: calc(100% - 80px);
    background: #ffffff;
  }
}
</style>
