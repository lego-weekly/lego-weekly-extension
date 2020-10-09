import Vue from "vue";
import App from "./App.vue";
import store from "../store";
import {
  Button,
  Form,
  FormModel,
  Tabs,
  Input,
  Select,
  Cascader,
  Tag,
  Row,
  Col,
  Icon,
  Spin,
  Alert,
  message
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "../router";

const components = [
  Button,
  Tabs,
  Form,
  FormModel,
  Input,
  Select,
  Cascader,
  Tag,
  Row,
  Col,
  Icon,
  Alert,
  Spin
];

components.forEach(item => {
  Vue.use(item);
});

Vue.prototype.$message = message;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
