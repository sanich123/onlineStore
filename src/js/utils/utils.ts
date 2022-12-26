import { Router } from "../router/router";
import { DataType } from "../types/types";
import { priceOrStockMap, routes, SEARCH_KEYS } from "./const";

export function getUrl(string: string) {
  return string.slice(string.indexOf("#"));
}

export function hashListener() {
  return window.addEventListener("hashchange", (event) => {
    window.history.pushState({}, "", getUrl(event.newURL));
    Router(event.newURL);
  });
}

export function getSearchParams() {
  const location = window.location.href;
  const url = new URL(location).hash;
  const filtredParams = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  const searchParams = new URLSearchParams(filtredParams);
  const urlMinPrice = searchParams.get(SEARCH_KEYS.minPrice) || "";
  const urlMaxPrice = searchParams.get(SEARCH_KEYS.maxPrice) || "";
  const urlMinStock = searchParams.get(SEARCH_KEYS.minStock) || "";
  const urlMaxStock = searchParams.get(SEARCH_KEYS.maxStock) || "";
  const urlCategories = searchParams.getAll(SEARCH_KEYS.category) || "";
  const urlBrands = searchParams.getAll(SEARCH_KEYS.brand) || "";
  const urlSortPriceRating = searchParams.get(SEARCH_KEYS.sort) || "";
  const urlSize = searchParams.get(SEARCH_KEYS.size) || "";
  const urlSearch = searchParams.get(SEARCH_KEYS.search) || "";
  return {
    urlMinPrice,
    urlMaxPrice,
    urlMinStock,
    urlMaxStock,
    urlCategories,
    urlBrands,
    urlSortPriceRating,
    urlSize,
    urlSearch,
    searchParams,
    filtredParams,
  };
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
    if (key === SEARCH_KEYS.category || key === SEARCH_KEYS.brand) {
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
    minValue.textContent = `${id.includes("price") ? "$" : ""}${value}`;
  } else {
    params.set(priceOrStockMap[id], value);
    maxValue.textContent = `${id.includes("price") ? "$" : ""}${value}`;
  }
  window.history.pushState({}, "", createSearchUrl(params));
}

export function setCheckedToCheckboxes(
  nodes: NodeListOf<HTMLInputElement>,
  categories: string[]
) {
  return [...nodes]
    .filter(({ value }) => categories.includes(value))
    .map((category) => (category.checked = true));
}

export function setCheckedRadio(
  nodes: NodeListOf<HTMLInputElement>,
  type: string,
  searchValue: string
) {
  return [...nodes]
    .filter(({ name, value }) => name === type && value === searchValue)
    .map((e) => (e.checked = true));
}

export function setValueToPriceRange(
  nodes: NodeListOf<HTMLInputElement>,
  spanNodeMin: HTMLSpanElement,
  spanNodeMax: HTMLSpanElement,
  minPrice: string,
  maxPrice: string,
  minProductPrice: number,
  maxProductPrice: number
) {
  return [...nodes].forEach((node) => {
    if (minPrice) {
      if (node.id === "price-asc") {
        node.value = minPrice;
        spanNodeMin.textContent = `$${minPrice}`;
      } else if (maxPrice) {
        node.value = maxPrice;
        spanNodeMax.textContent = `$${maxPrice}`;
      }
    } else {
      if (minProductPrice) {
        if (node.id === "price-asc") {
          node.value = minProductPrice.toString();
          spanNodeMin.textContent = `$${minProductPrice}`;
        }
      } else if (maxProductPrice) {
        node.value = maxProductPrice.toString();
        spanNodeMax.textContent = `$${maxProductPrice}`;
      }
    }
  });
}
export function setValueToStockRange(
  nodes: NodeListOf<HTMLInputElement>,
  spanNodeMin: HTMLSpanElement,
  spanNodeMax: HTMLSpanElement,
  minStock: string,
  maxStock: string,
  minProductStock: number,
  maxProductStock: number
) {
  return [...nodes].forEach((node) => {
    if (minStock) {
      if (node.id === "stock-asc") {
        node.value = minStock;
        spanNodeMin.textContent = minStock;
      } else if (maxStock) {
        node.value = maxStock;
        spanNodeMax.textContent = maxStock;
      }
    } else {
      if (minProductStock) {
        if (node.id === "stock-asc") {
          node.value = minProductStock.toString();
          spanNodeMin.textContent = `${minProductStock}`;
        }
      } else if (maxProductStock) {
        node.value = maxProductStock.toString();
        spanNodeMax.textContent = maxProductStock.toString();
      }
    }
  });
}

export function getMinMaxPriceStock(mocks: DataType[]) {
  const mappedPrice = mocks.map(({ price }) => price);
  const mappedStock = mocks.map(({ stock }) => stock);
  const minProductPrice = Math.min(...mappedPrice);
  const maxProductPrice = Math.max(...mappedPrice);
  const minProductStock = Math.min(...mappedStock);
  const maxProductStock = Math.max(...mappedStock);
  return {
    minProductPrice,
    maxProductPrice,
    minProductStock,
    maxProductStock,
  };
}


export const getTotalSumWithAmount = (total: number, { amount, price }: { amount: number, price: number }) => total + (amount * price);
export const getTotalAmount = (total: number, {amount}: {amount: number}) => total + amount;

