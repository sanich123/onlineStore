import { DataType } from "../types/types";
import { EMPTY_CART } from "../utils/const";
import { createCartItem } from "./create-cart-item";

export function createCartItemsList(products: DataType[]) {
    return `<ul class="cart__products-list cart-products-list">${products.length ? products.map((product: DataType) => createCartItem(product)).join('') : EMPTY_CART}</ul>`
}