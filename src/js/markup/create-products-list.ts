import { DataType } from "../types/types";
import { EMPTY_LIST } from "../utils/const";
import { createItem } from "./create-product";
import { createSortOptions } from "./create-sort-options";

export function createProductsList(productsList: DataType[], ids: number[]) {
  return `<section class="main__products products-list">
          ${createSortOptions(productsList.length)}
         <ul class="products">
         ${productsList.length ? productsList.map((product) => createItem(product, ids)).join('') : EMPTY_LIST}
         </ul></section>`;
}
