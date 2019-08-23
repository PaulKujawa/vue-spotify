import { store } from "@/plugins/vuex";
import Login from "@/views/Login.vue";
import LoginCheck from "@/views/LoginCheck.vue";
import NotFound from "@/views/NotFound.vue";
import Startpage from "@/views/Startpage.vue";
import Vue from "vue";
import Router, { NavigationGuard } from "vue-router";

Vue.use(Router);

const authGuard: NavigationGuard = (to, _, next) => {
  if (store.state.auth.loggedIn) {
    next();
  } else {
    next({ name: "login", query: { redirect: to.fullPath } });
  }
};

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "startPage",
      component: Startpage
    },
    {
      path: "/categories",
      name: "categoryList",
      beforeEnter: authGuard,
      component: () =>
        import(
          /* webpackChunkName: "category-list" */ "@/views/CategoryList.vue"
        )
    },
    {
      path: "/category/:id",
      name: "category",
      beforeEnter: authGuard,
      component: () =>
        import(/* webpackChunkName: "category" */ "@/views/Category.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/login-check",
      name: "loginCheck",
      component: LoginCheck
    },
    {
      path: "/search",
      name: "search",
      beforeEnter: authGuard,
      component: NotFound
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
