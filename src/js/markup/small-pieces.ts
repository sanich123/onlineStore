import { DataType } from "../types/types";
import { getMinMaxPriceStock, getSearchParams } from "../utils/utils";

export function brandCheckbox(brand: string) {
  const { urlBrands } = getSearchParams();
  return `<label class="filters-brand__label">
  <input class="filters-brand__input" type="checkbox" ${urlBrands.includes(brand) ? 'checked' : ''} name="brand" value="${brand}"/> 
  ${brand}</label>`;
}

export function categoryCheckbox(category: string) {
  const { urlCategories } = getSearchParams();
  return `<label class="filters-category__label">
    <input class="filters-category__input" type="checkbox" ${urlCategories.includes(category) ? 'checked' : ''} name="category" value="${category}"/> 
    ${category}</label>`;
}

export function priceRanges(defaultData: DataType[], filtredData: DataType[]) {
  const defaultPrice = defaultData.map(({ price }) => price);
  const defaultMinPrice = Math.min(...defaultPrice);
  const defaultMaxPrice = Math.max(...defaultPrice);
  const { urlMinPrice, urlMaxPrice } = getSearchParams();
  const { minProductPrice, maxProductPrice } = getMinMaxPriceStock(filtredData);
  const finallyMinPrice = urlMinPrice ? urlMinPrice : minProductPrice && Number.isFinite(minProductPrice) ? minProductPrice : defaultMinPrice;
  const finallyMaxPrice = urlMaxPrice ? urlMaxPrice : maxProductPrice && Number.isFinite(maxProductPrice) ? maxProductPrice : defaultMaxPrice;

  return `<label class="filters-range-price__label">
              <span class="minPrice">$${finallyMinPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-asc"
                min="${defaultMinPrice}"
                max="${defaultMaxPrice}"
                step="10"
                value="${finallyMinPrice}"
              /> </label
            ><br />
            <label class="filters-range-price__label">
              <span class="maxPrice">$${finallyMaxPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-desc"
                min="${defaultMinPrice}"
                max="${defaultMaxPrice}"
                step="10"
                value="${finallyMaxPrice}"
              />
            </label>`;
}


export function stockRanges(defaultData: DataType[], filtredData: DataType[]) {
  const defaultStock = defaultData.map(({ stock }) => stock);
  const defaultMinStock = Math.min(...defaultStock);
  const defaultMaxStock = Math.max(...defaultStock);
  const { urlMinStock, urlMaxStock } = getSearchParams();
  const { minProductStock, maxProductStock } = getMinMaxPriceStock(filtredData);
  const finallyMinStock = urlMinStock ? urlMinStock : minProductStock && Number.isFinite(minProductStock) ? minProductStock : defaultMinStock;
  const finallyMaxStock = urlMaxStock ? urlMaxStock : maxProductStock && Number.isFinite(maxProductStock) ? maxProductStock : defaultMaxStock;

  return `<label class="filters-range-stock__label">
              <span class="minStock">${finallyMinStock}</span>
              <input
                class="filters-range-stock__input"
                type="range"
                id="stock-asc"
                min="${defaultMinStock}"
                max="${defaultMaxStock}"
                step="10"
                value="${finallyMinStock}"
              /> </label
            ><br />
            <label class="filters-range-stock__label">
              <span class="maxStock">${finallyMaxStock}</span>
              <input
                class="filters-range-stock__input"
                type="range"
                id="stock-desc"
                min="${defaultMinStock}"
                max="${defaultMaxStock}"
                step="10"
                value="${finallyMaxStock}"
              />
            </label>`;
}

export function createCoupon(couponValue: string, discount: number, applied: boolean) {
  return `<li class="coupons-list__item coupons-item">
    <p class="coupons-item__p"> You ${applied ? 'applied' : 'may apply'} ${ couponValue } coupon with ${ discount }% discount! </p>
      <button class="coupons-item__btn ${applied ? 'applied' : ''}" value="${discount}" name="${couponValue}" type="button">${applied ? 'Drop' : 'Add'}</button></li>`
}
