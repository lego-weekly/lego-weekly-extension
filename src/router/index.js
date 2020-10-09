import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "popup-home" */ "../popup/Home.vue")
  },
  {
    path: "/sign/:type",
    name: "Sign",
    component: () =>
      import(/* webpackChunkName: "popup-login" */ "../popup/Sign.vue")
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.fullPath === "/login" && window.localStorage.getItem("token")) {
    // 登陆页有token跳转到首页
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
