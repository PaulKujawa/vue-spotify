import { AuthResponseSuccess } from "@/models/authentication";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

type RootState = {
  auth: AuthResponseSuccess | null;
};

export const store = new Vuex.Store<RootState>({
  state: {
    auth: null
  },
  mutations: {
    authenticate(state, payload: AuthResponseSuccess) {
      state.auth = payload;
    }
  }
});
