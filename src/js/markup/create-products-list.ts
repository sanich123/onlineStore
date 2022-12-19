import { DataType } from "../types/types";
import { createItem } from "./create-product";
import { createSortOptions } from "./create-sort-options";

export function createProductsList(mocks: DataType[]) {
  return `<section class="main__products products-list">
          ${createSortOptions()}
         <ul class="products">
         ${mocks.map((product) => createItem(product)).join('')}
         </ul></section>`;
}
