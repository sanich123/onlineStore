export function getListeners() {
  const priceSort = document.querySelector(".price-sort");
  const ratingSort = document.querySelector('.rating-sort');
  const formSearch = document.querySelector(".sort-options__form-search");
  const inputSearch = document.querySelector(".sort-options__search");
  const inputSize = document.querySelector(".size-change__radio");
  const categoriesFilter = document.querySelector(".filters__category");
  const brandFilter = document.querySelector(".filters__brand");
  const priceRangeFilter = document.querySelector(".filters-range-price");
  const stockRangeFilter = document.querySelector(".filters-range-stock");
  const resetBtn = document.querySelector(".filters__reset-btn");
  const copyLinkBtn = document.querySelector(".filters__copy-link");
  const minPrice = document.querySelector('.minPrice');
  const maxPrice = document.querySelector('.maxPrice');
  const minStock = document.querySelector('.minStock');
  const maxStock = document.querySelector('.maxStock');
  const categories = document.querySelectorAll('.filters-category__input') as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll('.filters-brand__input') as NodeListOf<HTMLInputElement>;

  return {
    priceSort,
    ratingSort,
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
    categories,
    brands,
  };
}
