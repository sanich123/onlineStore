import { DataType } from "../types/types";
import { EMPTY_CART } from "../utils/const";

export function createCartItemsList(products: DataType[]) {
    return `<ul class="cart__products-list cart-products-list">${products.length ? products.map((product: DataType) => createCartItem(product)).join('') : EMPTY_CART}</ul>`
}

export function createCartItem({ id, title, description, price, stock, thumbnail, amount }: DataType) {
    return `<li class="cart-products-list__item cart-item">
              <p class="cart-item__title">${title}</p>
              <img
                class="cart-item__img"
                src="${thumbnail}"
                alt="${title}"
                title="${title}"
                name="image"
                id="${id}"
              />
              <p class="cart-item__description">
                ${description}
              </p>
              <span class="cart-item__stock">In stock: ${stock}</span>
              <span class="cart-item__price">Price: $${price}</span>
              <div class="cart-item__btns">
                <button class="cart-item__decrement" aria-label="decrement-amount" name="decrement" value="${id}">-</button>
                  <span class="cart-item__amount">${amount}</span>
                <button class="cart-item__increment" aria-label="increment-amount" name="increment" value="${id}">+</button>
              </div>
            </li>`
}