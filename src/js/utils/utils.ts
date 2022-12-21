import { Router } from "../router/router";
import { DataType, ParsedParams } from "../types/types";
import { priceOrStockMap, routes, SEARCH_KEYS, SORT_TYPES } from "./const";

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
  const urlMinPrice = searchParams.get(SEARCH_KEYS.minPrice) || '';
  const urlMaxPrice = searchParams.get(SEARCH_KEYS.maxPrice) || '';
  const urlMinStock = searchParams.get(SEARCH_KEYS.minStock) || '';
  const urlMaxStock = searchParams.get(SEARCH_KEYS.maxStock) || '';
  const urlCategories = searchParams.getAll(SEARCH_KEYS.category) || '';
  const urlBrands = searchParams.getAll(SEARCH_KEYS.brand) || '';
  const urlSortPriceRating = searchParams.get(SEARCH_KEYS.sort) || '';
  const urlSize = searchParams.get(SEARCH_KEYS.size) || '';
  const urlSearch = searchParams.get(SEARCH_KEYS.search) || '';
  return {
    urlMinPrice, urlMaxPrice, urlMinStock, urlMaxStock, urlCategories, urlBrands, urlSortPriceRating, urlSize, urlSearch, searchParams
  }
}

export function getFiltredData(mocks: DataType[], params: ParsedParams) {
  const { urlCategories, urlBrands, urlSortPriceRating, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, urlSearch } = params;
 
  let filtredData: DataType[] = [];

  if (urlCategories.length) {
    for (const urlCategory of urlCategories) {
      const filtredCategories = mocks.filter(({ category }) => category === urlCategory);
      filtredData = [...filtredData, ...filtredCategories];
    }
  }
  if (urlBrands.length) {
    for (const urlBrand of urlBrands) {
      const filtredBrands = urlCategories.length > 0 ? filtredData.filter(({ brand }) => brand === urlBrand) : mocks.filter(({ brand }) => brand === urlBrand);
      if (urlCategories.length > 0) {
        filtredData = [...filtredBrands];
      } else {
        filtredData = [...filtredData, ...filtredBrands];
      }
    }
  }
  if (urlSortPriceRating) {
    if (urlSortPriceRating === SORT_TYPES.ascendPrice) {
      filtredData = filtredData.slice().sort((a, b) => a.price - b.price);
    } else if (urlSortPriceRating === SORT_TYPES.descendPrice) {
      filtredData = filtredData.slice().sort((a, b) => b.price - a.price);
    } else if (urlSortPriceRating === SORT_TYPES.ascendRating) {
      filtredData = filtredData.slice().sort((a, b) => a.rating - b.rating);
    } else {
      filtredData = filtredData.slice().sort((a, b) => b.rating - a.rating);
    }
  }
  if (urlSearch) {
    const regExp = new RegExp(urlSearch, 'gi');
    filtredData = filtredData.filter((product) => regExp.test(JSON.stringify(product)))
  }
  if (urlMinPrice) {
    filtredData = filtredData.filter(({price}) => price >= +urlMinPrice);
  }
  if (urlMaxPrice) {
    filtredData = filtredData.filter(({price}) => price <= +urlMaxPrice);
  }
  if (urlMinStock) {
    filtredData = filtredData.filter(({stock}) => stock >= +urlMinStock);
  }
  if (urlMaxStock) {
    filtredData = filtredData.filter(({ stock }) => stock <= +urlMaxStock);
  }

  return filtredData;
}

export function getCheckedCategories(checkboxes: NodeListOf<HTMLInputElement>) {
  return [...checkboxes].filter(({ checked }) => checked).map(({ value }) => `category=${value}`).join("&");
}

export function getCheckedBrands(brands: NodeListOf<HTMLInputElement>) {
  return [...brands].filter(({ checked }) => checked).map(({ value }) => `brand=${value}`).join("&");
}

export function createSearchUrl(params: URLSearchParams) {
  const categories = document.querySelectorAll(".filters-category__input") as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll(".filters-brand__input") as NodeListOf<HTMLInputElement>;
  const checkedBrands = getCheckedBrands(brands) ? `&${getCheckedBrands(brands)}` : "";
  const checkedCheckboxes = getCheckedCategories(categories) ? `&${getCheckedCategories(categories)}` : "";
  for (const [key] of params) {
    if (key === SEARCH_KEYS.category || key === SEARCH_KEYS.brand) {
      params.delete(key);
    }
  }
  return `${ window.location.origin }/${ routes.catalog }?${ params.toString() }${ checkedBrands }${ checkedCheckboxes }`;
}

export function getMinMaxValue(id: string, value: string, params: URLSearchParams, minValue: Element, maxValue: Element) {
  if (id.includes("asc")) {
    params.set(priceOrStockMap[id], value);
    minValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
  } else {
    params.set(priceOrStockMap[id], value);
    maxValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
  }
  window.history.pushState({}, "", createSearchUrl(params));
}

export function setCheckedToCheckboxes(nodes: NodeListOf<HTMLInputElement>, categories: string[]) {
  return [...nodes].filter(({ value }) => categories.includes(value)).map((category) => (category.checked = true));
}

export function setCheckedRadio(nodes: NodeListOf<HTMLInputElement>, type: string, searchValue: string) {
    return [...nodes].filter(({ name, value }) => name === type && value === searchValue).map((e) => (e.checked = true));
}

export function setValueToPriceRange(
  nodes: NodeListOf<HTMLInputElement>,
  spanNodeMin: HTMLSpanElement,
  spanNodeMax: HTMLSpanElement,
  minPrice: string,
  maxPrice: string,
) {
  return [...nodes].forEach((node) => {
    if (node.id === "price-asc") {
      node.value = minPrice;
      spanNodeMin.textContent = `$${minPrice}`;
    } else {
      node.value = maxPrice;
      spanNodeMax.textContent = `$${maxPrice}`;
    }
  });
}
export function setValueToStockRange(
  nodes: NodeListOf<HTMLInputElement>,
  spanNodeMin: HTMLSpanElement,
  spanNodeMax: HTMLSpanElement,
  minStock: string,
  maxStock: string,
) {
  return [...nodes].forEach((node) => {
    if (node.id === "stock-asc") {
      node.value = minStock;
      spanNodeMin.textContent = minStock;
    } else {
      node.value = maxStock;
      spanNodeMax.textContent = maxStock;
    }
  });
}
