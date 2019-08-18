import { AuthRequest, AuthResponse } from "@/models/authentication";
import { store } from "@/plugins/vuex";
import { mapQueryParams } from "@/utils/fetch-utils";
import { webStorage } from "@/utils/web-storage";

const AUTH_WEB_STORAGE_KEY = "oauth-redirect";

export const getSpotifyAuthUrl = () => {
  // url needs to be registered in Spotify.
  // Hence, a path generation would be pointless.

  return mapQueryParams<AuthRequest>({
    client_id: "06ea71fe4011445093a4e6acfb6ff784",
    response_type: "token",
    redirect_uri: window.location.origin + "/login-check"
  })("https://accounts.spotify.com/authorize");
};

export const mapSpotifyAuthRes = (hash: string): AuthResponse => {
  return hash
    .substring(1)
    .split("&")
    .map(keyValue => keyValue.split("="))
    .reduce(
      (acc: any, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      ({} as any) as AuthResponse
    );
};

export const setPostAuthTarget = (fullPath: string) => {
  webStorage.setItem(AUTH_WEB_STORAGE_KEY, fullPath);
};

export const getPostAuthTarget = () => {
  const preAuthTarget = webStorage.getItem(AUTH_WEB_STORAGE_KEY);

  if (preAuthTarget) {
    webStorage.removeItem(AUTH_WEB_STORAGE_KEY);
  }

  if (store.state.auth.loggedIn) {
    return preAuthTarget ? { path: preAuthTarget } : { name: "categories" };
  }

  return { name: "startPage" };
};
