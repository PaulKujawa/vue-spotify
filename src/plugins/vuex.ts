import { AuthResponseSuccess } from "@/models/authentication";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

type RootState = {
  auth: {
    accessToken?: string;
    loggedIn: boolean;
  };
};

export const store = new Vuex.Store<RootState>({
  state: {
    auth: { loggedIn: false }
  },
  mutations: {
    authenticate(state, payload: AuthResponseSuccess) {
      state.auth = { accessToken: payload.access_token, loggedIn: true };
    }
  }
});
