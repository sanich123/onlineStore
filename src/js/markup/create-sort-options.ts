import { SIZE_VALUES } from "../utils/const";
import { createArrowDown, createArrowUp } from "./create-icons";

export function createSortOptions(productsLength: number) {
    return `<div class="products-list__options sort-options">
          <form class="sort-direction__radio radio-form sort-radio">
            <label class="radio-form__label">
              <input name="sort-radio" class="radio-form__input" type="radio" value="price-asc" />
              Price ${createArrowUp()}
            </label>
            <label class="radio-form__label">
              <input name="sort-radio" class="radio-form__input" type="radio" value="price-desc" />
              Price ${createArrowDown()}
            </label>
            <label class="radio-form__label">
              <input name="sort-radio" class="radio-form__input" type="radio" value="rating-asc" />
              Rating ${createArrowUp()}
            </label>
            <label class="radio-form__label">
              <input name="sort-radio" class="radio-form__input" type="radio" value="rating-desc" />
              Rating ${createArrowDown()}
            </label>
          </form>
          <span class="sort-options__items-count">Found: ${productsLength}</span>
          <input
            type="search"
            class="sort-options__search"
            placeholder="Search product"
          />
          <form class="size-change__radio size-change">
          ${SIZE_VALUES.map((size) => (
            `<label class="size-change__label">
              <input name="layout" type="radio" class="size-change__radio" value="${size.toLowerCase()}" />
              ${size}</label>`
          )).join('')}
          </form>
        </div>`
}