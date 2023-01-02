import { mocks } from '../mocks/mocks';
import { Router } from '../router/router';
import { DataType } from '../types/types';
import { priceOrStockMap, routes, SEARCH_KEYS } from './const';

export function getUrl(string: string) {
  return string.slice(string.indexOf('#'));
}

export function hashListener() {
  return window.addEventListener('hashchange', (event) => {
    window.history.pushState({}, '', getUrl(event.newURL));
    Router(event.newURL);
  });
}

export function findWordsFromRightProperties(data: DataType[], regExp: RegExp) {
  return data.filter(({ title, description, price, brand, category, rating, discountPercentage }) => regExp.test(JSON.stringify({ title, description, price, brand, category, rating, discountPercentage })));
}
export function getSearchParams() {
  const location = window.location.href;
  const url = new URL(location).hash;
  const filtredParams = url.includes('?') ? url.slice(url.indexOf('?')) : '';
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
  const urlPageNumber = searchParams.get(SEARCH_KEYS.pageNumber) || '';
  const urlAmountOfItems = searchParams.get(SEARCH_KEYS.amountOfItems) || '';
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
    urlPageNumber,
    urlAmountOfItems,
  };
}

export function setCheckedValuesToParams(checkboxes: NodeListOf<HTMLInputElement>, params: URLSearchParams) {
  return [...checkboxes].filter(({ checked }) => checked).forEach(({ value, name }) => params.append(name, value));
}

export function createSearchUrl(params: URLSearchParams) {
  const page = window.location.href.includes(routes.catalog) ? routes.catalog : routes.cart;
  const categories = document.querySelectorAll('.filters-category__input') as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll('.filters-brand__input') as NodeListOf<HTMLInputElement>;
  const searchUrl = params;
    for (const [key] of searchUrl) {
      if (key === SEARCH_KEYS.category || key === SEARCH_KEYS.brand) {
        searchUrl.delete(key);
      }
    }
    setCheckedValuesToParams(categories, searchUrl);
    setCheckedValuesToParams(brands, searchUrl);
    return `${window.location.origin}/${page}?${[...new Set([...searchUrl.toString().split('&')])].join('&')}`;
}

export function getMinMaxValue(id: string, value: string, params: URLSearchParams, minValue: HTMLInputElement, maxValue: HTMLInputElement, filtredData: DataType[]) {
  // const { minProductPrice: defaultMinPrice, maxProductPrice: defaultMaxPrice, minProductStock: defaultMinStock, maxProductStock: defaultMaxStock } = getMinMaxPriceStock(mocks);
  const { minProductPrice: minFiltredPrice, maxProductPrice: maxFiltredPrice, minProductStock: minFiltredStock, maxProductStock: maxFiltredStock } = getMinMaxPriceStock(filtredData);
  const { urlMinPrice, urlMaxPrice, urlMinStock, urlMaxStock } = getSearchParams();
  // console.log(defaultMinPrice, defaultMaxPrice, minFiltredPrice, maxFiltredPrice, urlMinPrice, urlMaxPrice);
  if (id.includes('asc')) {
    if (id.includes('price')) {
      if (Number(value) < Number(urlMaxPrice)) {
        params.set(priceOrStockMap[id], value);
        minValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
      if (Number(value) < Number(maxFiltredPrice)) {
        params.set(priceOrStockMap[id], value);
        minValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
    } else {
      if (Number(value) < Number(urlMaxStock)) {
        params.set(priceOrStockMap[id], value);
        minValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
      if (Number(value) < Number(maxFiltredStock)) {
        params.set(priceOrStockMap[id], value);
        minValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
    }
  } else {
    if (id.includes('price')) {
      if (Number(value) > Number(urlMinPrice)) {
        params.set(priceOrStockMap[id], value);
        maxValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      } 
      if (Number(value) > Number(minFiltredPrice)) {
        params.set(priceOrStockMap[id], value);
        maxValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
    } else {
      if (Number(value) > Number(urlMinStock)) {
        params.set(priceOrStockMap[id], value);
        maxValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
      if (Number(value) > Number(minFiltredStock)) {
        params.set(priceOrStockMap[id], value);
        maxValue.textContent = `${id.includes('price') ? '$' : ''}${value}`;
      }
    }
  }
  window.history.pushState({}, '', createSearchUrl(params));
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

export const getTotalSumWithAmount = (total: number, { amount, price }: {amount: number, price: number}) => total + (amount * price);
export const getTotalAmount = (total: number, {amount}: {amount: number}) => total + amount;

export function setSizeToProductsList(urlSize: string, productsList: HTMLUListElement, fullDescriptionList: NodeListOf<HTMLUListElement>, productsItems: NodeListOf<HTMLLIElement>, productsBtns: NodeListOf<HTMLButtonElement>, btnWrapper: NodeListOf<HTMLDivElement>) {
  if (urlSize) {
    if (urlSize === 'wide') {
      productsList.style.gridTemplateColumns = 'repeat(3, auto)';
      fullDescriptionList.forEach((item) => item.style.display = 'block');
      productsItems.forEach((item) => item.style.width = 'auto');
      productsBtns.forEach((item) => {
        item.style.width = 'auto';
        item.style.height = 'auto';
        item.style.fontSize = '18px';
      });
      btnWrapper.forEach((wrapper) => wrapper.style.gap = '20px');
    } else {
      productsList.style.gridTemplateColumns = 'repeat(5, auto)';
      fullDescriptionList.forEach((item) => item.style.display = 'none');
      productsItems.forEach((item) => item.style.width = 'auto');
      productsBtns.forEach((item) => {
        item.style.width = 'auto';
        item.style.height = 'auto';
        item.style.fontSize = '12px';
      });
      btnWrapper.forEach((wrapper) => wrapper.style.gap = '7px');
    }
  }
}

