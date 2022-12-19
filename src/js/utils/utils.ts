import { Router } from "../router/router";
import { DataType } from "../types/types";

export function getUrl(string: string) {
  return string.slice(string.indexOf("#"));
}

export function hashListener() {
  return window.addEventListener("hashchange", (event) => {
    window.history.pushState(
      { urlPath: getUrl(event.newURL) },
      "",
      getUrl(event.newURL)
    );
    Router(event.newURL);
  });
}

export function getSearchParams() {
  const location = window.location.href;
  const url = new URL(location).hash;
  const filtredParams = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  return new URLSearchParams(filtredParams);
}

export function getFiltredData(
  mocks: DataType[],
  searchParams: URLSearchParams
) {
  let filtredData;
  if (searchParams) {
    for (const [key] of searchParams) {
      filtredData = mocks.filter((product) => {
        const value = searchParams.get(key);
        const productProperty = product[key as keyof DataType];
        if (
          typeof productProperty === "number" &&
          productProperty === Number(value)
        ) {
          return product;
        }
        if (typeof productProperty === "string" && productProperty === value) {
          return product;
        }
      });
    }
  }
  return filtredData;
}
export function getCheckedCheckboxes(checkboxes: NodeListOf<HTMLInputElement>) {
  return [...checkboxes].filter(({checked}) => checked).map(({value}) => `category=${value}`).join('&');
}
