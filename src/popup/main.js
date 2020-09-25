import Vue from "vue";
import App from "./App.vue";
import store from "../store";
import AntDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from '../router'

Vue.use(AntDesign)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
