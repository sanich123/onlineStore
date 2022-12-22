import { createFilters } from "../markup/create-filters";
import { createHeader } from "../markup/create-header";
import { createProductsList } from "../markup/create-products-list";
import { getListeners } from "../markup/get-listeners";
import { getNodes } from "../markup/get-nodes";
import { mocks } from "../mocks/mocks";
import { routes, SEARCH_KEYS } from "../utils/const";
import { createSearchUrl, getFiltredData, getMinMaxPriceStock, getMinMaxValue, getSearchParams, hashListener, setCheckedRadio, setCheckedToCheckboxes, setValueToPriceRange, setValueToStockRange } from "../utils/utils";

export function CreateCatalog() {
  const { urlCategories, urlBrands, urlSortPriceRating, urlSize, urlSearch, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, searchParams } = getSearchParams();
  const filtredData = getFiltredData(mocks, getSearchParams());
const { minProductPrice, maxProductPrice, minProductStock, maxProductStock } = getMinMaxPriceStock(mocks);

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks, filtredData, urlMinPrice, urlMaxPrice)}${createProductsList(filtredData)}</main>`;
  }
  const { priceRatingSort, inputSearch, inputSize, categoriesFilter, brandFilter, priceRangeFilter, stockRangeFilter, resetBtn,copyLinkBtn, minPrice, maxPrice, minStock, maxStock } = getListeners();
  const { categories, brands, radioPriceRating, radioSize, priceRangeInputs, stockRangeInputs, spanShowMinPrice, spanShowMaxPrice,spanShowMinStock, spanShowMaxStock } = getNodes();

  setCheckedToCheckboxes(categories, urlCategories);
  setCheckedToCheckboxes(brands, urlBrands);
  setCheckedRadio(radioPriceRating, 'sort-radio', urlSortPriceRating);
  setCheckedRadio(radioSize, 'layout', urlSize);
  inputSearch.value = urlSearch;
  setValueToPriceRange(priceRangeInputs, spanShowMinPrice, spanShowMaxPrice, urlMinPrice, urlMaxPrice, minProductPrice, maxProductPrice);
  setValueToStockRange(stockRangeInputs, spanShowMinStock, spanShowMaxStock, urlMinStock, urlMaxStock, minProductStock, maxProductStock);

  priceRatingSort?.addEventListener("click", ({ target }) => {
    const { value } = target as HTMLInputElement;
    searchParams.set(SEARCH_KEYS.sort, value);
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCatalog();
  });
  inputSearch?.addEventListener("change", ({ target }) => {
    const { value } = target as HTMLInputElement;
    searchParams.set("search", value);
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCatalog();
  });
  inputSize?.addEventListener("click", ({ target }) => {
    const { value, checked } = target as HTMLInputElement;
    if (value && checked) {
      searchParams.set(SEARCH_KEYS.size, value);
      window.history.pushState({}, "", createSearchUrl(searchParams));
    }
  });
  categoriesFilter?.addEventListener("click", () => {
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCatalog();
  });
  brandFilter?.addEventListener("click", () => {
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCatalog();
  });
  priceRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (minPrice && maxPrice) {
      getMinMaxValue(id, value, searchParams, minPrice, maxPrice);
      CreateCatalog();
    }
  });
  stockRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (minStock && maxStock) {
      getMinMaxValue(id, value, searchParams, minStock, maxStock);
      CreateCatalog();
    }
  });
  resetBtn?.addEventListener("click", () => {
    window.history.pushState({}, "", routes.catalog);
    CreateCatalog();
  });
  copyLinkBtn?.addEventListener("click", () => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
  });
  hashListener();
}
