import {
  buildUrl,
  FetchResponse,
  httpFetch,
  StringDirectory
} from "@/utils/fetch-utils";

export function fetchBrowseApi<DTO>(
  endpoint: string,
  urlQueries: StringDirectory = {}
): FetchResponse<DTO> {
  const url = buildUrl({ api: "browse", endpoint, urlQueries });

  return httpFetch<DTO>(url);
}
