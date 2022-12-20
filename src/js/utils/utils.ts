import { Router } from "../router/router";
import { DataType } from "../types/types";
import { priceOrStockMap, routes } from "./const";

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
export function getCheckedCategories(checkboxes: NodeListOf<HTMLInputElement>) {
  return [...checkboxes]
    .filter(({ checked }) => checked)
    .map(({ value }) => `category=${value}`)
    .join("&");
}
export function getCheckedBrands(brands: NodeListOf<HTMLInputElement>) {
  return [...brands]
    .filter(({ checked }) => checked)
    .map(({ value }) => `brand=${value}`)
    .join("&");
}

export function createSearchUrl(params: URLSearchParams) {
  const categories = document.querySelectorAll(
    ".filters-category__input"
  ) as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll(
    ".filters-brand__input"
  ) as NodeListOf<HTMLInputElement>;
  const checkedBrands = getCheckedBrands(brands)
    ? `&${getCheckedBrands(brands)}`
    : "";
  const checkedCheckboxes = getCheckedCategories(categories)
    ? `&${getCheckedCategories(categories)}`
    : "";
  for (const [key] of params) {
    if (key === "category" || key === "brand") {
      params.delete(key);
    }
  }

  return `${window.location.origin}/${
    routes.catalog
  }?${params.toString()}${checkedBrands}${checkedCheckboxes}`;
}

export function getMinMaxValue(
  id: string,
  value: string,
  params: URLSearchParams,
  minValue: Element,
  maxValue: Element
) {
  if (id.includes("asc")) {
    params.set(priceOrStockMap[id], value);
    minValue.textContent = `$${value}`;
  } else {
    params.set(priceOrStockMap[id], value);
    maxValue.textContent = `$${value}`;
  }
  window.history.pushState({}, "", createSearchUrl(params));
}

export function setCheckedToCheckboxes(
  searchParams: URLSearchParams,
  nodes: NodeListOf<HTMLInputElement>,
  type: string
) {
  const types = searchParams.getAll(type);
  return [...nodes]
    .filter(({ value }) => types.includes(value))
    .map((category) => (category.checked = true));
}
