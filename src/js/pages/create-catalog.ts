import { createFilters } from "../markup/create-filters";
import { createHeader, createFooter } from "../markup/create-header-footer";
import { createProductsList } from "../markup/create-products-list";
import { getListeners } from "../markup/get-listeners";
import { getNodes } from "../markup/get-nodes";
import { getNodesCart } from "../markup/get-nodes-cart";
import { mocks } from "../mocks/mocks";
import { CopyBtnText, DataType } from "../types/types";
import { LS_KEYS, routes, SEARCH_KEYS } from "../utils/const";
import { getFiltredData } from "../utils/filter-sort";
import { getFromLocalStorage, localStorageHelper } from "../utils/local-storage";
import { getPaginatedData, setDefaultPagesAndAmount, setPaginationUrlParams } from "../utils/pagination";
import { createSearchUrl, getMinMaxValue, getSearchParams, hashListener, setRightPositionToRanges, setSizeToProductsList } from "../utils/utils";
import CreateCart from "./create-cart";

export default function CreateCatalog() {
  const storageItems: DataType[] = getFromLocalStorage(LS_KEYS.cart);
  const ids = storageItems.map(({ id }) => id);
  const { urlSize, urlPageNumber, urlAmountOfItems, searchParams } = getSearchParams();
  const filtredData = getFiltredData(mocks, getSearchParams());
  setDefaultPagesAndAmount(urlPageNumber, urlAmountOfItems, searchParams);
  const { amountPages, paginatedData } = getPaginatedData(filtredData, Number(urlAmountOfItems), Number(urlPageNumber));

  if (amountPages && Number(urlPageNumber) > amountPages) {
    searchParams.set(SEARCH_KEYS.pageNumber, `${amountPages}`);
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCatalog();
    return;
  }

  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks, filtredData)}${createProductsList(paginatedData, ids, urlAmountOfItems, urlPageNumber, amountPages, filtredData)}</main>${createFooter()}`;

  const { priceRatingSort, inputSearch, inputSize, categoriesFilter, brandFilter, priceRangeFilter, stockRangeFilter, resetBtn, copyLinkBtn, minPrice, maxPrice, minStock, maxStock, productsList } = getListeners();
  const { fullDescriptionList, productsItems, productsBtns, btnWrapper, logo, cart } = getNodes();
  const { paginationForm } = getNodesCart();

  if (urlSize) {
    setSizeToProductsList(urlSize, productsList, fullDescriptionList, productsItems, productsBtns, btnWrapper);
  }
  setRightPositionToRanges(filtredData);

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
      CreateCatalog();
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
    getMinMaxValue(id, value, searchParams, minPrice, maxPrice, filtredData);
    CreateCatalog();
  });
  stockRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    getMinMaxValue(id, value, searchParams, minStock, maxStock, filtredData);
    CreateCatalog();
  });
  resetBtn?.addEventListener("click", () => {
    window.history.pushState({}, "", `${routes.catalog}`);
    window.location.reload();
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
  paginationForm?.addEventListener('click', ({ target }) => {
    const { name, value } = target as HTMLInputElement;
    if (name && value) {
      setPaginationUrlParams(name, value, searchParams, urlPageNumber);
      window.history.pushState({}, "", createSearchUrl(searchParams));
      CreateCatalog();
    }
  });
  cart?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.cart}`);
    CreateCart();
  });
  logo?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.catalog}`);
    CreateCatalog();
  });
  hashListener();
}
