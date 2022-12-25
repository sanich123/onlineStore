import { DataType } from "../types/types";
import { createCartItem } from "./create-cart-item";

export function createCartItemsList(products: DataType[]) {
    return `<ul class="cart__products-list cart-products-list">${products.length ? products.map((product: DataType) => createCartItem(product)).join('') : '<p class="empty-cart">There are no items in your cart, go ahead and buy something!</p>'}</ul>`
}