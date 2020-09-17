import Vue from "vue";
import App from "./App.vue";
import store from "../store";
import {
  Button,
  Form,
  Tabs,
  Input,
  Select,
  Cascader,
  Tag,
  Row,
  Col,
  message
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const components = [Button, Tabs, Form, Input, Select, Cascader, Tag, Row, Col];

components.forEach(item => {
  Vue.use(item);
});

Vue.prototype.$message = message;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
