import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodesCart } from "../markup/get-nodes-cart";
import { CouponsType } from "../types/types";
import { LS_KEYS } from "../utils/const";
import { localStorageCouponHelper } from "../utils/local-storage";
import { getTotalAmount, getTotalSumWithAmount, hashListener, incrementDecrementCounter, setAmountProperty } from "../utils/utils";

export function CreateCart() {
  const couponsInCart = JSON.parse(localStorage.getItem(LS_KEYS.promocode) || '[]');
  const itemsInCart = JSON.parse(localStorage.getItem(LS_KEYS.cart) || "[]");
  const withAmount = itemsInCart.map(setAmountProperty);
  const totalSum = withAmount.reduce(getTotalSumWithAmount, 0);
  const totalAmountOfProducts = withAmount.reduce(getTotalAmount, 0);

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}
    <main class="page__main">
    <section class="cart">
    ${createCartItemsList(withAmount)}
    ${createTotalInfo(totalSum, totalAmountOfProducts, couponsInCart)}
    </section></main>`;
  } 
  const {
    productsList, couponInput, couponsList,
  } = getNodesCart();

  productsList.addEventListener('click', ({ target }: Event) => {
    const { value, name } = target as HTMLButtonElement;
      incrementDecrementCounter(name, value, withAmount)
  });
  couponInput.addEventListener('input', ({ target }) => {
    const { value } = target as HTMLInputElement;
    localStorageCouponHelper(value);
  });
  couponsList?.addEventListener('click', ({ target }) => {
    const { value, name } = target as HTMLButtonElement;
    const appliedCoupons = couponsInCart.map((coupon: CouponsType) => {
      if (coupon.couponValue === name) {
        coupon.applied = !coupon.applied;
        return coupon;
      }
      return coupon;
    });
    localStorage.setItem(LS_KEYS.promocode, JSON.stringify(appliedCoupons));
    CreateCart();
  });
  hashListener();
}
