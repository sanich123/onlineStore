import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodesCart } from "../markup/get-nodes-cart";
import { CouponsType } from "../types/types";
import { getTotalSumAndCoupons } from "../utils/cart-helpers";
import { LS_KEYS } from "../utils/const";
import { incrementDecrementCounter, localStorageCouponHelper, setAppliedToCoupons } from "../utils/local-storage";
import { hashListener } from "../utils/utils";

export function CreateCart() {
  const { couponsInCart, withAmount, totalSum, totalAmountOfProducts, filtredDiscount, finalSum } = getTotalSumAndCoupons();
  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}
    <main class="page__main">
    <section class="cart">
    ${createCartItemsList(withAmount)}
    ${createTotalInfo(totalSum, totalAmountOfProducts, couponsInCart, filtredDiscount, finalSum)}
    </section></main>`;
  } 
  const {
    productsList, couponInput, couponsList, totalSumHeader,
  } = getNodesCart();

  totalSumHeader.textContent = `$${finalSum}`;

  productsList.addEventListener('click', ({ target }: Event) => {
    const { value, name } = target as HTMLButtonElement;
    incrementDecrementCounter(name, value, withAmount)
  });
  couponInput.addEventListener('input', ({ target }) => {
    const { value } = target as HTMLInputElement;
    localStorageCouponHelper(value);
  });
  couponsList?.addEventListener('click', ({ target }) => {
    const { name } = target as HTMLButtonElement;
    if (target instanceof HTMLElement) {
      if (target.classList.contains('applied')) {
        const actualCoupons = couponsInCart.filter(({ couponValue }: CouponsType) => couponValue !== name);
        localStorage.setItem(LS_KEYS.promocode, JSON.stringify(actualCoupons));
        return CreateCart();
      }
    }
    const appliedCoupons = setAppliedToCoupons(couponsInCart, name);
    localStorage.setItem(LS_KEYS.promocode, JSON.stringify(appliedCoupons));
    CreateCart();
  });
  hashListener();
}
