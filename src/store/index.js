import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isAddRouter: false,
    asyncRoutes: []
  },
  actions: {},
  mutations: {
    // 公共方法
    update(state, obj) {
      let { name, value } = obj;
      state[name] = value;
    }
  }
});
