import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../popup/Login.vue";
import Home from "../popup/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next) => {
  if(to.fullPath === '/login' && window.localStorage.getItem("token")) { // 登陆页有token跳转到首页
    next({path:'/'})
  } else {
    next()
  }
})

export default router;
