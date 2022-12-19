import { DataType } from "../types/types";

export function createItem(product: DataType) {
    const {thumbnail, title, id, category, brand, price, discountPercentage, rating, stock} = product;

    return `<li class="products__item products-item">
            <span class="products-item__description">${title}</span>
            <img
              class="products-item__img"
              alt="${title}"
              src="${thumbnail}"
            />
            <div class="btn-wrapper">
              <button class="products-item__btn" type="button" value="${id}">To cart</button>
              <button class="products-item__btn" type="button" value="${id}">Details</button>
            </div>

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
            </li>`
}