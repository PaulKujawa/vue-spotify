import { AuthResponseSuccess } from "@/models/authentication";
import { webStorage } from "@/utils/web-storage";
import Vue from "vue";
import Vuex from "vuex";

type RootStateAuth = { accessToken?: string; loggedIn: boolean };

type RootState = {
  auth: RootStateAuth;
};

Vue.use(Vuex);

const VUEX_WEB_STORAGE_KEY = "vuex-auth";

const getInitialState = (): RootStateAuth => {
  const accessToken = webStorage.getItem(VUEX_WEB_STORAGE_KEY);

  return accessToken ? { loggedIn: true, accessToken } : { loggedIn: false };
};

export const store = new Vuex.Store<RootState>({
  state: {
    auth: getInitialState()
  },
  mutations: {
    authenticate(state, payload: AuthResponseSuccess) {
      state.auth = { accessToken: payload.access_token, loggedIn: true };
      webStorage.setItem(VUEX_WEB_STORAGE_KEY, payload.access_token);
    }
  }
});
