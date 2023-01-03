import { DataType } from "../types/types";
import { DEFAULT_AMOUNT_ITEMS, EMPTY_LIST } from "../utils/const";
import { createPagination } from "./create-pagination";
import { createItem } from "./create-product";
import { createSortOptions } from "./create-sort-options";

export function createProductsList(productsList: DataType[], ids: number[], urlAmountOfItems: string, urlPageNumber: string, amountPages: number, filtredData: DataType[]) {
  let renderedData: DataType[] = [];
  if (productsList.length) {
    renderedData = productsList;
  } else {
    renderedData = filtredData;
  }

  return `<section class="main__products products-list">
          ${createSortOptions(filtredData.length)}
          ${filtredData.length && filtredData.length > DEFAULT_AMOUNT_ITEMS ? createPagination(urlPageNumber, urlAmountOfItems, amountPages) : ''}
         <ul class="products">
          ${renderedData.length ? renderedData.map((product) => createItem(product, ids)).join('') : EMPTY_LIST}
         </ul></section>`;
}
