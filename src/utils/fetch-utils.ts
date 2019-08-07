import { pipe } from "@/utils/pipe";
import { onBeforeDestroy, onCreated, state, watch } from "vue-function-api";

type FetchParams = { url: RequestInfo; init: RequestInit };

export type FetchResponse<DTO> = {
  data: DTO | null;
  error: { message: string; status?: number } | null;
  pending: boolean;
};

const AUTH_KEY = "foo-bar";

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

export const mapQueryParams = (queryParams: { [key: string]: string }) => {
  return (path: string) => {
    const url = new URL(path);

    // have proper URL encoding
    Object.entries(queryParams).forEach(([queryKey, queryValue]) =>
      url.searchParams.append(queryKey, queryValue)
    );

    return url.toString();
  };
};

export const mapFetchParams = (
  url: RequestInfo,
  init?: RequestInit
): FetchParams => {
  const headers = [
    ["Accept", "application/json"],
    ["Authorization", "Bearer " + AUTH_KEY]
  ];

  return {
    url,
    init: { ...init, headers }
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

  onCreated(doFetch);

  onBeforeDestroy(() => {
    if (controller) {
      controller.abort();
    }
  });

  return fetchResponse;
}
