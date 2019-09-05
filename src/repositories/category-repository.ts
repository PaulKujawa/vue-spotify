import { Category, CategoryPaging } from "@/models/category";
import {
  FetchResponse,
  getSpotifyApiBrowse,
  logErrors,
  mapQueryParams,
  mapRequestInit,
  mapSpotifyEndpoint,
  sendFetch
} from "@/utils/fetch-utils";
import { pipe } from "@/utils/pipe";
import { reactive, watch } from "@vue/composition-api";

const cache: { [id: string]: Category } = {};

export function fetchCategories(): FetchResponse<CategoryPaging> {
  const fetchResponse: FetchResponse<CategoryPaging> = pipe(
    getSpotifyApiBrowse,
    mapSpotifyEndpoint("categories"),
    mapQueryParams({ limit: "40" }),
    mapRequestInit(),
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
    // TODO throws during compilation
    return reactive({
      data: cache[id],
      error: null,
      pending: false
    });
  }

  return pipe(
    getSpotifyApiBrowse,
    mapSpotifyEndpoint("categories/" + id),
    mapRequestInit(),
    sendFetch,
    logErrors({ whitelist: [404] })
  )();
}
