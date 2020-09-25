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
router.beforeEach((to,from,next) => {
  if(to.fullPath !== '/' && !window.localStorage.getItem("token")) { // 非登陆页没有token跳回首页
    next({path:'/'})
  } else if(to.fullPath === '/' && window.localStorage.getItem("token")) { // 登陆页有token跳转到首页
    next({path:'/home'})
  } else {
    next()
  }
})

export default router;
