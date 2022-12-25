import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createTotalInfo } from "../markup/create-total-info";
import { LS_KEYS } from "../utils/const";
import { hashListener, setAmountProperty } from "../utils/utils";

export function CreateCart() {
  const itemsInCart = JSON.parse(localStorage.getItem(LS_KEYS.cart) || "[]");
  const withAmount = itemsInCart.map(setAmountProperty);
  console.log(withAmount);
  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}
    <main class="page__main">
    <section class="cart">
    ${createCartItemsList()}
    ${createTotalInfo()}
    </section></main>`;
  }
  hashListener();
}
