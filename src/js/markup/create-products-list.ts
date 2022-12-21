import { DataType } from "../types/types";
import { createItem } from "./create-product";
import { createSortOptions } from "./create-sort-options";

export function createProductsList(productsList: DataType[]) {
  return `<section class="main__products products-list">
          ${createSortOptions(productsList.length)}
         <ul class="products">
         ${productsList.map((product) => createItem(product)).join('')}
         </ul></section>`;
}
