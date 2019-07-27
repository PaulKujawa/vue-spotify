import { Category, CategoryPaging } from "@/models/category";
import { fetchBrowseApi } from "@/utils/fetch-apis";
import { FetchResponse } from "@/utils/fetch-utils";
import { state, watch } from "vue-function-api";

/*
 * watcher would not need null-check because
 * only 1st emission is null-placeholders and
 * only one value emits a 2nd time with real data (response or error)
 * and first emission becomes ignored by lazy watchers
 */

const cache: { [id: string]: Category } = {};

export function fetchCategories(): FetchResponse<CategoryPaging> {
  const fetchResponse = fetchBrowseApi<CategoryPaging>("categories", {
    limit: "40"
  });

  watch(
    () => fetchResponse.data,
    data => {
      if (data) {
        data.categories.items.forEach(cat => (cache[cat.id] = cat));
      }
    },
    { lazy: true }
  );

  watch(
    () => fetchResponse.error,
    error => {
      if (error) {
        // TODO log to sentry
        window.console.warn("error logged to sentry", error);
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

  // TODO log errors other than 404 to sentry

  return fetchBrowseApi<Category>("categories/" + id);
}
