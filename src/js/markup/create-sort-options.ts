import { priceRadioValues, SIZE_VALUES } from "../utils/const";
import { getSearchParams } from "../utils/utils";

export function createSortOptions(productsLength: number) {
  const { urlSortPriceRating, urlSearch, urlSize } = getSearchParams();

    return `<div class="products-list__options sort-options">
          <form class="sort-direction__radio radio-form sort-radio">
          ${priceRadioValues.map(({ value, icon }) => `<label class="radio-form__label">
              <input name="sort-radio" class="radio-form__input" type="radio" value="${value}" ${urlSortPriceRating === value ? 'checked' : ''}/> ${icon}</label>`).join('')}
          </form>
          <span class="sort-options__items-count">Found: ${productsLength}</span>
          <input
            type="search"
            class="sort-options__search"
            placeholder="Search product"
            value="${urlSearch ? urlSearch : ''}"
          />
          <form class="size-change__radio size-change">
          ${SIZE_VALUES.map((size) => (
            `<label class="size-change__label">
              <input name="layout" type="radio" class="size-change__radio" value="${size.toLowerCase()}" ${urlSize === size.toLowerCase() ? 'checked' : ''} /> ${size}</label>`
          )).join('')}
          </form>
        </div>`
}