import App from "@/App.vue";
import "@/filters/index";
import { router } from "@/plugins/router";
import "@/plugins/sentry";
import "@/plugins/vue-functions-api";
import vuetify from "@/plugins/vuetify";
import { store } from "@/plugins/vuex";
import "@babel/polyfill";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  // @ts-ignore
  vuetify,
  store
}).$mount("#app");
