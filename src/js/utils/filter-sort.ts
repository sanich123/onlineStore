import { DataType, ParsedParams } from "../types/types";
import { SEARCH_KEYS, SORT_TYPES } from "./const";
import { findWordsFromRightProperties } from "./utils";

export function getFiltredData(mocks: DataType[], params: ParsedParams) {
  const { urlCategories, urlBrands, urlSortPriceRating, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, urlSearch, searchParams } = params;
  let filtredData: DataType[] = [];

  if (
    !searchParams.has(SEARCH_KEYS.brand) && 
    !searchParams.has(SEARCH_KEYS.category) && 
    !searchParams.has(SEARCH_KEYS.maxPrice) && 
    !searchParams.has(SEARCH_KEYS.minPrice) && 
    !searchParams.has(SEARCH_KEYS.minStock) && 
    !searchParams.has(SEARCH_KEYS.maxStock) &&
    !searchParams.has(SEARCH_KEYS.search) && 
    !searchParams.has(SEARCH_KEYS.sort)
    ) return mocks;

  if (urlCategories.length) {
    for (const urlCategory of urlCategories) {
      filtredData = [...filtredData, ...mocks.filter(({ category }) => category === urlCategory)];
    }
  }
  if (urlBrands.length) {
    for (const urlBrand of urlBrands) {
      filtredData = [...filtredData, ...mocks.filter(({ brand }) => brand === urlBrand)];
    }
  }
  if (urlMinPrice) {
    filtredData.length ? 
    filtredData = filtredData.filter(({ price }) => price >= +urlMinPrice) :
    filtredData = mocks.filter(({ price }) => price >= +urlMinPrice);
  }
  if (urlMaxPrice) {
    filtredData.length ? 
    filtredData = filtredData.filter(({ price }) => price <= +urlMaxPrice) : filtredData = mocks.filter(({ price }) => price <= +urlMaxPrice);
  }
  if (urlMinStock) {
    filtredData.length ? 
    filtredData = filtredData.filter(({ stock }) => stock >= +urlMinStock) : filtredData = mocks.filter(({ stock }) => stock >= +urlMinStock);
  }
  if (urlMaxStock) {
    filtredData.length ?
    filtredData = filtredData.filter(({ stock }) => stock <= +urlMaxStock) : filtredData = mocks.filter(({ stock }) => stock <= +urlMaxStock);
  }
  if (urlSortPriceRating) {
    if (urlSortPriceRating === SORT_TYPES.ascendPrice) {
      filtredData.length ? 
      filtredData = filtredData.slice().sort((a, b) => a.price - b.price) :
      filtredData = mocks.slice().sort((a, b) => a.price - b.price);
    } else if (urlSortPriceRating === SORT_TYPES.descendPrice) {
      filtredData.length ? 
      filtredData = filtredData.slice().sort((a, b) => b.price - a.price) :
      filtredData = mocks.slice().sort((a, b) => b.price - a.price);
    } else if (urlSortPriceRating === SORT_TYPES.ascendRating) {
      filtredData.length ? 
      filtredData = filtredData.slice().sort((a, b) => a.rating - b.rating) : filtredData = mocks.slice().sort((a, b) => a.rating - b.rating);
    } else {
      filtredData.length ? 
      filtredData = filtredData.slice().sort((a, b) => b.rating - a.rating) : filtredData = mocks.slice().sort((a, b) => b.rating - a.rating);
    }
  }
  if (urlSearch) {
    const regExp = new RegExp(urlSearch, "gi");
    filtredData.length ?
      filtredData = findWordsFromRightProperties(filtredData, regExp) :
      filtredData = findWordsFromRightProperties(mocks, regExp);
  }
  return filtredData;
}
