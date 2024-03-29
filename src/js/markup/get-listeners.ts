export function getListeners() {
  const priceRatingSort = document.querySelector(".sort-radio") as HTMLFormElement;
  const formSearch = document.querySelector(".sort-options__form-search");
  const inputSearch = document.querySelector(".sort-options__search") as HTMLInputElement;
  const inputSize = document.querySelector(".size-change__radio");
  const categoriesFilter = document.querySelector(".filters__category");
  const brandFilter = document.querySelector(".filters__brand");
  const priceRangeFilter = document.querySelector(".filters-range-price");
  const stockRangeFilter = document.querySelector(".filters-range-stock");
  const resetBtn = document.querySelector(".filters__reset-btn");
  const copyLinkBtn = document.querySelector(".filters__copy-link");
  const minPrice = document.querySelector('.min-price') as HTMLSpanElement;
  const maxPrice = document.querySelector('.max-price') as HTMLSpanElement;
  const minStock = document.querySelector('.min-stock') as HTMLSpanElement;
  const maxStock = document.querySelector('.max-stock') as HTMLSpanElement;
  const productsList = document.querySelector('.products') as HTMLUListElement;

  return {
    priceRatingSort,
    inputSearch,
    formSearch,
    inputSize,
    categoriesFilter,
    brandFilter,
    priceRangeFilter,
    stockRangeFilter,
    resetBtn,
    copyLinkBtn,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    productsList,
  };
}
