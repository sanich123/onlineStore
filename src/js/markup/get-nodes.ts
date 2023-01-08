export function getNodes() {
  const fullDescriptionList = document.querySelectorAll('.full-description') as NodeListOf<HTMLUListElement>;
  const productsItems = document.querySelectorAll('.products-item') as NodeListOf<HTMLLIElement>;
  const productsBtns = document.querySelectorAll('.products-item__btn') as NodeListOf<HTMLButtonElement>;
  const btnWrapper = document.querySelectorAll('.btn-wrapper') as NodeListOf<HTMLDivElement>;
  const logo = document.querySelector('.header__logo');
  const cart = document.querySelector('.logo__basket');

  return {
    fullDescriptionList,
    productsItems,
    productsBtns,
    btnWrapper,
    logo, cart
  };
}
