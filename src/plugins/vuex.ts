import { AuthResponseSuccess } from "@/models/authentication";
import { webStorage } from "@/utils/web-storage";
import Vue from "vue";
import Vuex from "vuex";

type RootStateAuth = {
  accessToken: string;
  expiration: number;
};

type RootState = {
  auth: { loggedIn: false } | ({ loggedIn: true } & RootStateAuth);
};

Vue.use(Vuex);

const VUEX_WEB_STORAGE_KEY = "vuex-auth";

export const store = new Vuex.Store<RootState>({
  state: {
    auth: ((): RootState["auth"] => {
      const storage = webStorage.getItem<RootStateAuth>(VUEX_WEB_STORAGE_KEY);
      return { ...storage, loggedIn: !!storage as any };
    })()
  },
  mutations: {
    authenticate(state, { access_token, expires_in }: AuthResponseSuccess) {
      const date = new Date();
      const expiration = date.getTime() + expires_in;
      const storage = { accessToken: access_token, expiration };

      state.auth = { ...storage, loggedIn: true };
      webStorage.setItem(VUEX_WEB_STORAGE_KEY, storage);
    }
  },
  getters: {
    auth: ({ auth }: RootState): RootState["auth"] => {
      if (!auth.loggedIn) {
        return auth;
      }

      const date = new Date();
      const now = date.getTime();

      if (now < auth.expiration) {
        return auth;
      }

      return { loggedIn: false };
    }
  }
});
