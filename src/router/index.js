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
  if(!window.localStorage.getItem("token")) {
    next({path:'/'})
  } else {
    if(to.fullPath === '/') {
      next({path:'/home'})
    } else {
      next()
    }
  }
})

export default router;
