import { Category, CategoryPaging } from "@/models/category";
import {
  FetchResponse,
  getSpotifyApiBrowse,
  logErrors,
  mapFetchParams,
  mapQueryParams,
  mapSpotifyEndpoint,
  sendFetch
} from "@/utils/fetch-utils";
import { pipe } from "@/utils/pipe";
import { state, watch } from "vue-function-api";

const cache: { [id: string]: Category } = {};

export function fetchCategories(): FetchResponse<CategoryPaging> {
  const fetchResponse: FetchResponse<CategoryPaging> = pipe(
    getSpotifyApiBrowse,
    mapSpotifyEndpoint("categories"),
    mapQueryParams({ limit: "40" }),
    mapFetchParams,
    sendFetch,
    logErrors()
  )();

  watch(
    () => fetchResponse.data,
    data => {
      if (data) {
        data.categories.items.forEach(cat => (cache[cat.id] = cat));
      }
    },
    { lazy: true }
  );

  return fetchResponse;
}

export function fetchCategory(id: string): FetchResponse<Category> {
  if (cache[id]) {
    return state({
      data: cache[id],
      error: null,
      pending: false
    });
  }

  return pipe(
    getSpotifyApiBrowse,
    mapSpotifyEndpoint("categories/" + id),
    mapFetchParams,
    sendFetch,
    logErrors({ whitelist: [404] })
  )();
}
