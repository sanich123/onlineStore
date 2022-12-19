import { DataType } from "../types/types";
import {
  brandCheckbox,
  categoryCheckbox,
  priceRanges,
  stockRanges,
} from "./small-pieces";

export function createFilters(products: DataType[]) {
  const categories = [...new Set(products.map(({ category }) => category))];
  const brands = [...new Set(products.map(({ brand }) => brand))];
  const minPrice = Math.min(...products.map(({ price }) => price));
  const maxPrice = Math.max(...products.map(({ price }) => price));
  const minStock = Math.min(...products.map(({ stock }) => stock));
  const maxStock = Math.max(...products.map(({ stock }) => stock));

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
            ${priceRanges(minPrice, maxPrice)}
          </fieldset>
        </form>
        <form class="filters-range-stock">
          <fieldset class="filters__fieldset">
            <legend class="filters-range-stock__legend">Stock</legend>
            ${stockRanges(minStock, maxStock)}
          </fieldset>
        </form>
        <button class="filters__reset-btn" type="button">Reset filters</button>
        <button class="filters__copy-link" type="button">Copy link</button>
    </section>`;
}
