import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodesCart } from "../markup/get-nodes-cart";
import { DataType } from "../types/types";
import { LS_KEYS } from "../utils/const";
import { hashListener, setAmountProperty } from "../utils/utils";

export function CreateCart() {
  const itemsInCart = JSON.parse(localStorage.getItem(LS_KEYS.cart) || "[]");
  const withAmount = itemsInCart.map(setAmountProperty);

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}
    <main class="page__main">
    <section class="cart">
    ${createCartItemsList(withAmount)}
    ${createTotalInfo()}
    </section></main>`;
  } 
  const {
    productsList
  } = getNodesCart();
  productsList.addEventListener('click', ({ target }: Event) => {
    if (target && 'name' in target && 'value' in target) {
      const { name, value } = target;
      if (name === 'increment') {
        itemsInCart.map((cartItem: DataType) => {
          if (cartItem.id === Number(value) && cartItem.amount && cartItem.amount < cartItem.stock) {
            cartItem.amount += 1;
            return cartItem;
          } else {
            return cartItem;
          }
        });
        localStorage.setItem(LS_KEYS.cart, JSON.stringify(itemsInCart))
        CreateCart();
      }
    }

    
  })
  hashListener();
}
