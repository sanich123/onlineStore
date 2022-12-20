import { createFilters } from "../markup/create-filters";
import { createHeader } from "../markup/create-header";
import { createProductsList } from "../markup/create-products-list";
import { getListeners } from "../markup/get-listeners";
import { getNodes } from "../markup/get-nodes";
import { mocks } from "../mocks/mocks";
import { routes, SEARCH_KEYS } from "../utils/const";
import { createSearchUrl, getFiltredData, getMinMaxValue, getSearchParams, hashListener, setCheckedRadio, setCheckedToCheckboxes } from "../utils/utils";

export function CreateCatalog() {
  const searchParams = getSearchParams();

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks)}${createProductsList(mocks)}</main>`;
  }
  const { priceSort, ratingSort, inputSearch, inputSize, categoriesFilter, brandFilter, priceRangeFilter, stockRangeFilter, resetBtn,copyLinkBtn, minPrice, maxPrice, minStock, maxStock } = getListeners();
  const { categories, brands, radioPriceRating, radioSize} = getNodes();
  setCheckedToCheckboxes(searchParams, categories, SEARCH_KEYS.category);
  setCheckedToCheckboxes(searchParams, brands, SEARCH_KEYS.brand);
  setCheckedRadio(radioPriceRating, 'price', searchParams.get(SEARCH_KEYS.sortPrice) || '');
  setCheckedRadio(radioPriceRating, 'rating', searchParams.get(SEARCH_KEYS.sortRating) || '');
  setCheckedRadio(radioSize, 'layout', searchParams.get(SEARCH_KEYS.size) || '');
  inputSearch.value = searchParams.get(SEARCH_KEYS.search) || '';

  priceSort?.addEventListener("click", ({ target }) => {
    const { value, checked } = target as HTMLInputElement;
    if (value && checked) {
      searchParams.set(SEARCH_KEYS.sortPrice, value);
      window.history.pushState({}, "", createSearchUrl(searchParams));
    }
  });
  ratingSort?.addEventListener("click", ({ target }) => {
    const { value, checked } = target as HTMLInputElement;
    if (value && checked) {
      searchParams.set(SEARCH_KEYS.sortRating, value);
      window.history.pushState({}, "", createSearchUrl(searchParams));
    }
  });
  inputSearch?.addEventListener("change", ({ target }) => {
    const { value } = target as HTMLInputElement;
    searchParams.set("search", value);
    window.history.pushState({}, "", createSearchUrl(searchParams));
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
  });
  brandFilter?.addEventListener("click", () => {
    window.history.pushState({}, "", createSearchUrl(searchParams));
  });
  priceRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (minPrice && maxPrice) {
      getMinMaxValue(id, value, searchParams, minPrice, maxPrice);
    }
  });
  stockRangeFilter?.addEventListener("change", ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (minStock && maxStock) {
      getMinMaxValue(id, value, searchParams, minStock, maxStock);
    }
  });
  resetBtn?.addEventListener("click", () => {
    window.history.pushState({}, "", routes.catalog);
  });
  copyLinkBtn?.addEventListener("click", () => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
  });

  hashListener();
}
