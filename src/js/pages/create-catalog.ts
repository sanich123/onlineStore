import { createFilters } from "../markup/create-filters";
import { createHeader } from "../markup/create-header";
import { createProductsList } from "../markup/create-products-list";
import { getListeners } from "../markup/get-listeners";
import { getNodes } from "../markup/get-nodes";
import { mocks } from "../mocks/mocks";
import { CopyBtnText, DataType } from "../types/types";
import { routes, SEARCH_KEYS } from "../utils/const";
import { getFiltredData } from "../utils/filter-sort";
import { localStorageHelper } from "../utils/local-storage";
import { createSearchUrl, getMinMaxPriceStock, getMinMaxValue, getSearchParams, hashListener, setCheckedRadio, setCheckedToCheckboxes, setValueToPriceRange, setValueToStockRange } from "../utils/utils";

export function CreateCatalog() {
  const storageItems: DataType[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const ids = storageItems.map(({ id }) => id);
  const { urlCategories, urlBrands, urlSortPriceRating, urlSize, urlSearch, urlMinStock, urlMaxStock, urlMinPrice, urlMaxPrice, searchParams } = getSearchParams();
  const filtredData = getFiltredData(mocks, getSearchParams());
  const { minProductPrice, maxProductPrice, minProductStock, maxProductStock } = getMinMaxPriceStock(mocks);
  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks, filtredData, urlMinPrice, urlMaxPrice)}${createProductsList(filtredData, ids)}</main>`;
  const { priceRatingSort, inputSearch, inputSize, categoriesFilter, brandFilter, priceRangeFilter, stockRangeFilter, resetBtn,copyLinkBtn, minPrice, maxPrice, minStock, maxStock, productsList } = getListeners();
  const { categories, brands, radioPriceRating, radioSize, priceRangeInputs, stockRangeInputs, spanShowMinPrice, spanShowMaxPrice,spanShowMinStock, spanShowMaxStock, cartShowPriceHeader } = getNodes();
  cartShowPriceHeader.innerText = `$${storageItems.reduce((total, { price }) => total + price, 0)}`;
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
    value ? searchParams.set(SEARCH_KEYS.search, value) : searchParams.delete(SEARCH_KEYS.search);
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
      getMinMaxValue(id, value, searchParams, minPrice, maxPrice);
      CreateCatalog();
  });
  stockRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
      getMinMaxValue(id, value, searchParams, minStock, maxStock);
      CreateCatalog();
  });
  resetBtn?.addEventListener("click", () => {
    window.history.pushState({}, "", routes.catalog);
    CreateCatalog();
  });
  copyLinkBtn?.addEventListener("click", () => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
    copyLinkBtn.textContent = CopyBtnText.success;
    setTimeout(() => copyLinkBtn.textContent = CopyBtnText.default, 1000)
  });
  productsList?.addEventListener("click", ({ target }) => {
    const { value, name } = target as HTMLButtonElement;
    localStorageHelper(name, value, ids, storageItems);
  });
  hashListener();
}
