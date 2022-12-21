export function getNodes() {
  const categories = document.querySelectorAll(".filters-category__input") as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll(".filters-brand__input") as NodeListOf<HTMLInputElement>;
  const radioPrice = document.querySelectorAll(".radio-form__input--price") as NodeListOf<HTMLInputElement>;
  const radioRating = document.querySelectorAll('.radio-form__input--price') as NodeListOf<HTMLInputElement>
  const radioSize = document.querySelectorAll(".size-change__radio") as NodeListOf<HTMLInputElement>;
  const priceRangeInputs = document.querySelectorAll('.filters-range-price__input') as NodeListOf<HTMLInputElement>;
  const stockRangeInputs = document.querySelectorAll('.filters-range-stock__input') as NodeListOf<HTMLInputElement>;
  const spanShowMinPrice = document.querySelector('.minPrice') as HTMLSpanElement;
  const spanShowMaxPrice = document.querySelector('.maxPrice') as HTMLSpanElement;
  const spanShowMinStock = document.querySelector('.minStock') as HTMLSpanElement;
  const spanShowMaxStock = document.querySelector('.maxStock') as HTMLSpanElement;
  return {
    categories,
    brands,
    radioPrice,
    radioRating,
    radioSize,
    priceRangeInputs,
    stockRangeInputs,
    spanShowMinPrice,
    spanShowMaxPrice,
    spanShowMinStock,
    spanShowMaxStock
  };
}
