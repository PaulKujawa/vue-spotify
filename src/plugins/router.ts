import NotFound from "@/views/NotFound.vue";
import Startpage from "@/views/Startpage.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

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
      component: () =>
        import(
          /* webpackChunkName: "category-list" */ "@/views/CategoryList.vue"
        )
    },
    {
      path: "/category/:id",
      name: "category",
      component: () =>
        import(/* webpackChunkName: "category" */ "@/views/Category.vue")
    },
    {
      path: "/search",
      name: "search",
      component: NotFound
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
