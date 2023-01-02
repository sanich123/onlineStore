import { DataType, ParsedParams } from "../types/types";
import { SEARCH_KEYS, SORT_TYPES } from "./const";
import { findWordsFromRightProperties } from "./utils";

export function getFiltredData(mocks: DataType[], params: ParsedParams) {
  const { urlCategories, urlBrands, urlSortPriceRating, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, urlSearch, searchParams } = params;
  let filtredData: DataType[] = [];
  console.log(urlCategories, urlBrands, urlSortPriceRating, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, urlSearch);

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
    if (filtredData.length) {
      filtredData = filtredData.filter(({ price }) => price >= Number(urlMinPrice)) ;
      if (!filtredData.length) {
        return filtredData;
      }
    } else {
      filtredData = mocks.filter(({ price }) => price >= Number(urlMinPrice));
      if (!filtredData.length) {
        return filtredData;
      }
    }    
  }
  if (urlMaxPrice) {
    if (filtredData.length) {
      filtredData = filtredData.filter(({ price }) => price <= Number(urlMaxPrice));
      if (!filtredData.length) {
        return filtredData;
      }
    } else {
      filtredData = mocks.filter(({ price }) => price <= +urlMaxPrice);
      if (!filtredData.length) {
        return filtredData;
      }
    } 
  }
  if (urlMinStock) {
    if (filtredData.length) {
      filtredData = filtredData.filter(({ stock }) => stock >= Number(urlMinStock));
      if (!filtredData.length) {
        return filtredData;
      }
    } else {
      filtredData = mocks.filter(({ stock }) => stock >= +urlMinStock);
      if (!filtredData.length) {
        return filtredData;
      }
    }
  }
  if (urlMaxStock) {
    if (filtredData.length) {
      filtredData = filtredData.filter(({ stock }) => stock <= Number(urlMaxStock));
      if (!filtredData.length) {
        return filtredData;
      }
    } else {
      filtredData = mocks.filter(({ stock }) => stock <= +urlMaxStock);
      if (!filtredData.length) {
        return filtredData;
      }
    }
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
    if (filtredData.length) {
      filtredData = findWordsFromRightProperties(filtredData, regExp);
      if (!filtredData.length) {
        return filtredData;
      }
    } else {
      filtredData = findWordsFromRightProperties(mocks, regExp);
      if (!filtredData.length) {
        return filtredData;
      }
    } 
  }
  return filtredData;
}
