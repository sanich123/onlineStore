import { mocks } from "../mocks/mocks";
import { DataType } from "../types/types";
import { brandCheckbox, categoryCheckbox, priceRanges, stockRanges } from "./small-pieces";

export function createFilters(products: DataType[], filtredProducts: DataType[]) {
  const categories = [...new Set(products.map(({ category }) => category))];
  const brands = [...new Set(products.map(({ brand }) => brand))];

  return `<section class="main__filters filters">
            <form class="filters__category filters-category">
          <fieldset class="filters__fieldset">
            <legend>Category</legend>
            ${categories.map((category) => categoryCheckbox(category)).join("")}
          </fieldset>
        </form>
        <form class="filters__brand filters-brand">
          <fieldset class="filters__fieldset">
            <legend>Brand</legend>
            ${brands.map((brand) => brandCheckbox(brand)).join("")}
          </fieldset>
        </form>
        <form class="filters-range-price">
          <fieldset class="filters__fieldset">
            <legend class="filters-range-price__legend">Price</legend>
            <div class="range-slider">
              <span class="range-selected"></span>
            </div>
            <div class="range-input">
            ${priceRanges(mocks, filtredProducts)}
            </div>
          </fieldset>
        </form>
        <form class="filters-range-stock">
          <fieldset class="filters__fieldset">
            <legend class="filters-range-stock__legend">Stock</legend>
            ${stockRanges(mocks, filtredProducts)}
          </fieldset>
        </form>
        <button class="filters__reset-btn" type="button">Reset filters</button>
        <button class="filters__copy-link" type="button">Copy link</button>
    </section>`;
}
