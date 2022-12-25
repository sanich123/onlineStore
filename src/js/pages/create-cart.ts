import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createTotalInfo } from "../markup/create-total-info";
import { hashListener } from "../utils/utils";

export function CreateCart() {
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
