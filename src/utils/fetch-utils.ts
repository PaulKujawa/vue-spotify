import { store } from "@/plugins/vuex";
import { pipe } from "@/utils/pipe";
import { onBeforeDestroy, onCreated, state, watch } from "vue-function-api";

type FetchParams = { url: RequestInfo; init: RequestInit };
export type FetchResponseError = { message: string; status?: number } | null;

export type FetchResponse<DTO> = {
  data: DTO | null;
  error: FetchResponseError;
  pending: boolean;
};

export const getSpotifyBaseUrl = () => "https://api.spotify.com/v1";

export const mapSpotifyApi = (api: string) => {
  return (baseUrl: string) => `${baseUrl}/${api}`;
};

export const getSpotifyApiBrowse = pipe(
  getSpotifyBaseUrl,
  mapSpotifyApi("browse")
);

export const mapSpotifyEndpoint = (endpoint: string) => {
  return (apiUrl: string) => `${apiUrl}/${endpoint}`;
};

export const mapQueryParams = <T extends { [key: string]: string }>(
  queryParams: T
) => {
  return (path: string) => {
    const url = new URL(path);

    // have proper URL encoding
    Object.entries(queryParams).forEach(([queryKey, queryValue]) =>
      url.searchParams.append(queryKey, queryValue)
    );

    return url.toString();
  };
};

export const mapRequestInit = (init?: RequestInit) => {
  return (url: RequestInfo) => {
    const headers = [["Accept", "application/json"]];
    const auth = store.getters.auth;

    // TODO otherwise, I could already throw here to save the request
    if (auth.loggedIn) {
      headers.push(["Authorization", "Bearer " + auth.accessToken]);
    }

    return {
      url,
      init: { headers, ...init }
    };
  };
};

/*
 * watcher would not need null-check because
 * only 1st emission has the initial null value and
 * only 2nd emission would have a real error and
 * the 1st emission becomes ignored due to lazyness
 */
export const logErrors = <DTO>({
  whitelist = []
}: { whitelist?: number[] } = {}) => {
  return (fetchResponse: FetchResponse<DTO>) => {
    watch(
      () => fetchResponse.error,
      error => {
        if (!error) {
          return;
        }

        if (!error.status || !whitelist.includes(error.status)) {
          window.console.warn("sentry:", error.message);
        }
      },
      { lazy: true }
    );

    return fetchResponse;
  };
};

export function sendFetch<DTO>({ url, init }: FetchParams): FetchResponse<DTO> {
  const fetchResponse = state({ data: null, error: null, pending: true });
  let controller: AbortController | null = null;

  const doFetch = async () => {
    controller = new AbortController();
    const { signal } = controller;

    try {
      const response = await fetch(url, { ...init, signal });

      if (!response.ok) {
        throw {
          message: response.statusText || String(response.status),
          status: response.status
        };
      }

      fetchResponse.data = await response.json();
    } catch (err) {
      fetchResponse.error = err;
    } finally {
      fetchResponse.pending = false;
    }
  };

  // TODO support to bind sendFetch to reactive property (switchMap behaviour)
  // vue-function-api does not support `effect-cleanup` of watch method yet
  onCreated(doFetch);

  onBeforeDestroy(() => {
    if (controller) {
      controller.abort();
    }
  });

  return fetchResponse;
}
