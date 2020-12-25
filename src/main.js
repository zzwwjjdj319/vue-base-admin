import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Router from "vue-router";

Vue.config.productionTip = false;

import ElementUI from "element-ui";

Vue.use(ElementUI);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

import "@/api/httpService/loginControl";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
