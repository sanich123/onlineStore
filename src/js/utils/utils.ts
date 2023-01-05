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
  const urlIsModalOpen = searchParams.get(SEARCH_KEYS.modal) || '';
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
    urlIsModalOpen,
  };
}

export function setCheckedValuesToParams(checkboxes: NodeListOf<HTMLInputElement>, params: URLSearchParams) {
  return [...checkboxes].filter(({ checked }) => checked).forEach(({ value, name }) => params.append(name, value));
}

export function createSearchUrl(params: URLSearchParams) {
  const page = window.location.href.includes(routes.catalog) ? routes.catalog : routes.cart;
  const categories = document.querySelectorAll('.filters-category__input') as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll('.filters-brand__input') as NodeListOf<HTMLInputElement>;
  params.getAll(SEARCH_KEYS.category).forEach(() => params.delete(SEARCH_KEYS.category));
  params.getAll(SEARCH_KEYS.brand).forEach(() => params.delete(SEARCH_KEYS.brand));
  setCheckedValuesToParams(categories, params);
  setCheckedValuesToParams(brands, params);
  return `${window.location.origin}/${page}?${params.toString()}`
}

export function getMinMaxValue(id: string, value: string, params: URLSearchParams, minValue: HTMLSpanElement, maxValue: HTMLSpanElement, filtredData: DataType[]) {
  const { minProductPrice: minFiltredPrice, maxProductPrice: maxFiltredPrice, minProductStock: minFiltredStock, maxProductStock: maxFiltredStock } = getMinMaxPriceStock(filtredData);
  const { urlMinPrice, urlMaxPrice, urlMinStock, urlMaxStock } = getSearchParams();
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

export function setRightPositionToRanges(filtredData: DataType[]) {
  const rangeStroke = document.querySelector('.range-selected') as HTMLSpanElement;
  const rangeStrokeStock = document.querySelector('.range-selected-stock') as HTMLSpanElement;
  const defaultPrice = mocks.map(({ price }) => price);
  const defaultStock = mocks.map(({stock}) => stock);
  const defaultMinPrice = Math.min(...defaultPrice);
  const defaultMaxPrice = Math.max(...defaultPrice);
  const defaultMinStock = Math.min(...defaultStock);
  const defaultMaxStock = Math.max(...defaultStock);
  const { urlMinPrice, urlMaxPrice, urlMinStock, urlMaxStock } = getSearchParams();
  const { minProductPrice, maxProductPrice, minProductStock, maxProductStock } = getMinMaxPriceStock(filtredData);
  const finallyMinPrice = urlMinPrice ? urlMinPrice : minProductPrice && Number.isFinite(minProductPrice) ? minProductPrice : defaultMinPrice;
  const finallyMaxPrice = urlMaxPrice ? urlMaxPrice : maxProductPrice && Number.isFinite(maxProductPrice) ? maxProductPrice : defaultMaxPrice;
  const finallyMinStock = urlMinStock ? urlMinStock : minProductStock && Number.isFinite(minProductStock) ? minProductStock : defaultMinStock;
  const finallyMaxStock = urlMaxStock ? urlMaxStock : maxProductStock && Number.isFinite(maxProductStock) ? maxProductStock : defaultMaxStock;
  rangeStroke.style.left = `${Math.round((Number(finallyMinPrice) / defaultMaxPrice) * 100)}%`;
  rangeStroke.style.right = `${Math.round(100 - (Number(finallyMaxPrice) / defaultMaxPrice) * 100)}%`;
  rangeStrokeStock.style.left = `${Math.round((Number(finallyMinStock) / defaultMaxStock) * 100)}%`;
  rangeStrokeStock.style.right = `${Math.round(100 - (Number(finallyMaxStock) / defaultMaxStock) * 100)}%`;
}

