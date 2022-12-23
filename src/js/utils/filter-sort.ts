import { DataType, ParsedParams } from "../types/types";
import { SORT_TYPES } from "./const";

export function getFiltredData(mocks: DataType[], params: ParsedParams) {
  const {
    urlCategories,
    urlBrands,
    urlSortPriceRating,
    urlMinStock,
    urlMaxStock,
    urlMinPrice,
    urlMaxPrice,
    urlSearch,
    filtredParams,
  } = params;

  let filtredData: DataType[] = [];
  if (!filtredParams || filtredParams.length === 1) return mocks;

  if (urlCategories.length) {
    for (const urlCategory of urlCategories) {
      const filtredCategories = mocks.filter(
        ({ category }) => category === urlCategory
      );
      filtredData = [...filtredData, ...filtredCategories];
    }
  }
  if (urlBrands.length) {
    for (const urlBrand of urlBrands) {
      urlCategories.length
        ? (filtredData = filtredData.filter(({ brand }) => brand === urlBrand))
        : (filtredData = [
            ...filtredData,
            ...mocks.filter(({ brand }) => brand === urlBrand),
          ]);
    }
  }

  if (urlSearch) {
    const regExp = new RegExp(urlSearch, "gi");
    filtredData.length > 0
      ? (filtredData = filtredData.filter((product) =>
          regExp.test(JSON.stringify(product))
        ))
      : (filtredData = mocks.filter((product) =>
          regExp.test(JSON.stringify(product))
        ));
  }
  if (urlMinPrice) {
    filtredData.length > 0
      ? (filtredData = filtredData.filter(({ price }) => price >= +urlMinPrice))
      : (filtredData = mocks.filter(({ price }) => price >= +urlMinPrice));
  }
  if (urlMaxPrice) {
    filtredData.length > 0
      ? (filtredData = filtredData.filter(({ price }) => price <= +urlMaxPrice))
      : (filtredData = mocks.filter(({ price }) => price <= +urlMaxPrice));
  }
  if (urlMinStock) {
    filtredData.length > 0
      ? (filtredData = filtredData.filter(({ stock }) => stock >= +urlMinStock))
      : (filtredData = mocks.filter(({ stock }) => stock >= +urlMinStock));
  }
  if (urlMaxStock) {
    filtredData.length > 0
      ? (filtredData = filtredData.filter(({ stock }) => stock <= +urlMaxStock))
      : (filtredData = mocks.filter(({ stock }) => stock <= +urlMaxStock));
  }
  if (urlSortPriceRating) {
    if (urlSortPriceRating === SORT_TYPES.ascendPrice) {
      filtredData.length
        ? (filtredData = filtredData.slice().sort((a, b) => a.price - b.price))
        : (filtredData = mocks.slice().sort((a, b) => a.price - b.price));
    } else if (urlSortPriceRating === SORT_TYPES.descendPrice) {
      filtredData.length
        ? (filtredData = filtredData.slice().sort((a, b) => b.price - a.price))
        : (filtredData = mocks.slice().sort((a, b) => b.price - a.price));
    } else if (urlSortPriceRating === SORT_TYPES.ascendRating) {
      filtredData.length
        ? (filtredData = filtredData
            .slice()
            .sort((a, b) => a.rating - b.rating))
        : (filtredData = mocks.slice().sort((a, b) => a.rating - b.rating));
    } else {
      filtredData.length
        ? (filtredData = filtredData
            .slice()
            .sort((a, b) => b.rating - a.rating))
        : (filtredData = mocks.slice().sort((a, b) => b.rating - a.rating));
    }
  }
  return filtredData;
}
