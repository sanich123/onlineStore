export function getNodes() {
  const categories = document.querySelectorAll(".filters-category__input") as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll(".filters-brand__input") as NodeListOf<HTMLInputElement>;
  const radioPriceRating = document.querySelectorAll(".radio-form__input") as NodeListOf<HTMLInputElement>;
  const radioSize = document.querySelectorAll(".size-change__radio") as NodeListOf<HTMLInputElement>;
  const priceRangeInputs = document.querySelectorAll('.filters-range-price__input') as NodeListOf<HTMLInputElement>;
  const stockRangeInputs = document.querySelectorAll('.filters-range-stock__input') as NodeListOf<HTMLInputElement>;
  const spanShowMinPrice = document.querySelector('.minPrice') as HTMLSpanElement;
  const spanShowMaxPrice = document.querySelector('.maxPrice') as HTMLSpanElement;
  const spanShowMinStock = document.querySelector('.minStock') as HTMLSpanElement;
  const spanShowMaxStock = document.querySelector('.maxStock') as HTMLSpanElement;
  const cartBtns = document.querySelectorAll('.products-item__btn') as NodeListOf<HTMLButtonElement>;
  const cartShowPriceHeader = document.querySelector('.total__summary') as HTMLDivElement;
  const fullDescriptionList = document.querySelectorAll('.full-description') as NodeListOf<HTMLUListElement>;
  const productsItems = document.querySelectorAll('.products-item') as NodeListOf<HTMLLIElement>;
  const productsBtns = document.querySelectorAll('.products-item__btn') as NodeListOf<HTMLButtonElement>;
  const btnWrapper = document.querySelectorAll('.btn-wrapper') as NodeListOf<HTMLDivElement>;

  return {
    categories,
    brands,
    radioPriceRating,
    radioSize,
    priceRangeInputs,
    stockRangeInputs,
    spanShowMinPrice,
    spanShowMaxPrice,
    spanShowMinStock,
    spanShowMaxStock,
    cartBtns,
    cartShowPriceHeader,
    fullDescriptionList,
    productsItems,
    productsBtns,
    btnWrapper,
  };
}
