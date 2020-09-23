import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../popup/Login.vue";
import Home from "../popup/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;