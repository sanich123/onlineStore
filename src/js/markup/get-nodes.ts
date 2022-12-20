export function getNodes() {
  const categories = document.querySelectorAll(
    ".filters-category__input"
  ) as NodeListOf<HTMLInputElement>;
  const brands = document.querySelectorAll(
    ".filters-brand__input"
  ) as NodeListOf<HTMLInputElement>;
  const radioPriceRating = document.querySelectorAll(
    ".radio-form__input"
  ) as NodeListOf<HTMLInputElement>;
    const radioSize = document.querySelectorAll(".size-change__radio") as NodeListOf<HTMLInputElement>;

  return {
    categories,
    brands,
    radioPriceRating,
    radioSize,
  };
}
