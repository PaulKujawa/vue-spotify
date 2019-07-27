import { onBeforeDestroy, onCreated, state } from "vue-function-api";

export type StringDirectory = {
  [key: string]: string;
};

export type FetchResponse<DTO> = {
  data: DTO | null;
  error: TypeError | null;
  pending: boolean;
};

const AUTH_KEY = "foo-bi-dar";

function getHeaders(): HeadersInit {
  return [
    ["Accept", "application/json"],
    ["Authorization", "Bearer " + AUTH_KEY]
  ];
}

export function buildUrl({
  api,
  endpoint,
  urlQueries
}: {
  api: string;
  endpoint: string;
  urlQueries: StringDirectory;
}): string {
  const url = new URL(`https://api.spotify.com/v1/${api}/${endpoint}`);

  // have proper URL encoding
  Object.entries(urlQueries).forEach(([queryKey, queryValue]) =>
    url.searchParams.append(queryKey, queryValue)
  );

  return url.toString();
}

export function httpFetch<DTO>(url: string): FetchResponse<DTO> {
  const fetchResponse = state({
    data: null,
    error: null,
    pending: true
  });

  let controller: AbortController | null = null;

  // TODO make it possible to fetch upon any desired event, not only onCreated
  onCreated(async () => {
    controller = new AbortController();
    const { signal } = controller;
    const headers = getHeaders();

    try {
      const response = await fetch(url, { headers, signal });

      if (!response.ok) {
        const message = response.statusText
          ? `${response.status} ${response.statusText}`
          : `${response.status}`;

        throw TypeError(message);
      }

      fetchResponse.data = await response.json();
    } catch (err) {
      fetchResponse.error = err;
    } finally {
      fetchResponse.pending = false;
    }
  });

  onBeforeDestroy(() => {
    if (controller) {
      controller.abort();
    }
  });

  return fetchResponse;
}
