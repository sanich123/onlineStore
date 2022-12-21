import { SIZE_VALUES } from "../utils/const";
import { createArrowDown, createArrowUp } from "./create-icons";

export function createSortOptions() {
    return `<div class="products-list__options sort-options">
          <form class="sort-direction__radio radio-form price-sort">
            <label class="radio-form__label">
              <input name="price" class="radio-form__input--price" type="radio" value="asc" />
              Price ${createArrowUp()}
            </label>
            <label class="radio-form__label">
              <input name="price" class="radio-form__input--price" type="radio" value="desc" />
              Price ${createArrowDown()}
            </label>
            </form>
            <form class="sort-direction__radio radio-form rating-sort">
            <label class="radio-form__label">
              <input name="rating" class="radio-form__input--rating" type="radio" value="asc" />
              Rating ${createArrowUp()}
            </label>
            <label class="radio-form__label">
              <input name="rating" class="radio-form__input--rating" type="radio" value="desc" />
              Rating ${createArrowDown()}
            </label>
          </form>
          <span class="sort-options__items-count">Found: 100</span>
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