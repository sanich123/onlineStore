import { DataType } from "../types/types";
import { DEFAULT_AMOUNT_ITEMS, EMPTY_LIST } from "../utils/const";
import { createPagination } from "./create-pagination";
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
          ${renderedData.length ? renderedData.map((product) => createCatalogItem(product, ids)).join('') : EMPTY_LIST}
         </ul></section>`;
}

function createCatalogItem(product: DataType, ids: number[]) {
  const { thumbnail, title, id, category, brand, price, discountPercentage, rating, stock } = product;
  const isInCart = ids.includes(+id);

  return `<li class="products__item products-item">
            <span class="products-item__description">${title}</span>
              <ul class="products-item__full-description full-description">
              <li class="full-description__item">
                <span>Category</span>
                <span>${category}</span>
              </li>
              <li class="full-description__item">
                <span>Brand</span>
                <span>${brand}</span>
              </li>
              <li class="full-description__item">
                <span>Price</span>
                <span>$${price}.00</span>
              </li>
              <li class="full-description__item">
                <span>Discount</span>
                <span>%${discountPercentage}</span>
              </li>
              <li class="full-description__item">
                <span>Rating</span>
                <span>${rating}</span>
              </li>
              <li class="full-description__item">
                <span>Stock</span>
                <span>${stock}</span>
              </li>
            </ul>
            <img
              class="products-item__img"
              alt="${title}"
              src="${thumbnail}"
              loading="lazy"
            />
            <div class="btn-wrapper">
              <button class="products-item__btn ${isInCart ? 'in-cart' : ''}" type="button" value="${id}" name="${isInCart ? 'in-' : ''}cart">${isInCart ? 'In' : 'To'} cart</button>
              <button class="products-item__btn" type="button" value="${id}" name="product">Details</button>
            </div>
          </li>`
}
