import { createFilters } from "../markup/create-filters";
import { createHeader } from "../markup/create-header";
import { createProductsList } from "../markup/create-products-list";
import { getListeners } from "../markup/get-listeners";
import { mocks } from "../mocks/mocks";
import { routes } from "../utils/const";
import { getCheckedCheckboxes, getFiltredData, getSearchParams, hashListener } from "../utils/utils";

export function CreateCatalog() {
  const searchParams = getSearchParams();
  console.log(getFiltredData(mocks, searchParams));

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks)}${createProductsList(mocks)}</main>`;
  }
 const { priceSort, ratingSort, inputSearch, inputSize, categoriesFilter, brandFilter, priceRangeFilter, stockRangeFilter,resetBtn, copyLinkBtn, minPrice, maxPrice, minStock, maxStock } = getListeners();
  priceSort?.addEventListener('click', ({ target }) => {
    const { value, checked } = target as HTMLInputElement;
    if (value && checked) {
      console.log(`sortPrice=${value}`);
    }
  });
  ratingSort?.addEventListener('click', ({ target }) => {
    const { value, checked } = target as HTMLInputElement;
    if (value && checked) {
    console.log(`sortRating=${value}`);
    }
  });
  inputSearch?.addEventListener('change', ({ target }) => {
    const { value } = target as HTMLInputElement;
    const typedSearch = `search=${ value }`
    console.log(typedSearch);
  });
  
  inputSize?.addEventListener('click', ({ target }) => {
    const { value, checked } = target as HTMLInputElement; 
    if (value && checked) {
      const chosenSize = `size=${value}`;
      console.log(chosenSize);
    }
  });
  categoriesFilter?.addEventListener('click', () => {
    const categories = document.querySelectorAll('.filters-category__input') as NodeListOf<HTMLInputElement>;
    const checkedCheckboxes = getCheckedCheckboxes(categories);
    console.log(checkedCheckboxes);
  });
  brandFilter?.addEventListener('click', () => {
    const brands = document.querySelectorAll('.filters-brand__input') as NodeListOf<HTMLInputElement>;
    const checkedBrands = getCheckedCheckboxes(brands);
    console.log(checkedBrands);
  });
  priceRangeFilter?.addEventListener('change', ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (id === 'price-asc') {
      console.log(`minPrice=${value}`);
      if (minPrice) minPrice.textContent = `$${value}`;
    } else {
      if (maxPrice) maxPrice.textContent = `$${value}`;
      console.log(`maxPrice=${value}`);
    }
  });
  stockRangeFilter?.addEventListener('change', ({ target }) => {
    const { value, id } = target as HTMLInputElement;
    if (id === 'stock-asc') {
      if (minStock) minStock.textContent = value;
      console.log(`minStock=${value}`);
    } else {
      if (maxStock) maxStock.textContent = value;
      console.log(`maxStock=${value}`);
    }
  });
  resetBtn?.addEventListener('click', () => {
    window.history.pushState({ urlPath: routes.catalog }, '', routes.catalog);
  });
  copyLinkBtn?.addEventListener('click', () => {
    const location = window.location.href;
    navigator.clipboard.writeText(location);
  })

  hashListener();
}
