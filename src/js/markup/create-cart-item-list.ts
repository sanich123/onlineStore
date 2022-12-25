import { DataType } from "../types/types";
import { createCartItem } from "./create-cart-item";

export function createCartItemsList(products: DataType[]) {
    return `<ul class="cart__products-list cart-products-list">${products.map((product: DataType) => createCartItem(product)).join('')}</ul>`
}