import { DataType } from "../types/types";
import { ASC_DESC, MIN_MAX } from "../utils/const";
import { getMinMaxPriceStock, getSearchParams } from "../utils/utils";

export function brandCheckbox(brand: string, filtredBrands: string[]) {
  const { urlBrands } = getSearchParams();
  const isInFiltred = filtredBrands.includes(brand) ? 'green' : '';
  const isInUrl = urlBrands.includes(brand) ? 'checked' : '';
  return `<label for="${brand}" class="filters-brand__label ${isInFiltred}">
  <input id="${brand}" class="filters-brand__input" type="checkbox" ${isInUrl} name="brand" value="${brand}"/> ${brand}</label>`;
}

export function categoryCheckbox(category: string, filtredCategories: string[]) {
  const { urlCategories } = getSearchParams();
  const isInFiltred = filtredCategories.includes(category) ? 'green' : '';
  const isInUrl = urlCategories.includes(category) ? 'checked' : '';
  return `<label class="filters-category__label ${isInFiltred}">
    <input class="filters-category__input" type="checkbox" ${isInUrl}  name="category" value="${category}"/> ${category}</label>`;
}

export function priceRanges(defaultData: DataType[], filtredData: DataType[]) {
  const defaultPrice = defaultData.map(({ price }) => price);
  const defaultMinPrice = Math.min(...defaultPrice);
  const defaultMaxPrice = Math.max(...defaultPrice);
  const { urlMinPrice, urlMaxPrice } = getSearchParams();
  const { minProductPrice, maxProductPrice } = getMinMaxPriceStock(filtredData);
  const finallyMinPrice = urlMinPrice ? urlMinPrice : minProductPrice && Number.isFinite(minProductPrice) ? minProductPrice : defaultMinPrice;
  const finallyMaxPrice = urlMaxPrice ? urlMaxPrice : maxProductPrice && Number.isFinite(maxProductPrice) ? maxProductPrice : defaultMaxPrice;

  return `${ASC_DESC.map((direction) => `<label class="filters-range-price__label">
              <input class="filters-range-price__input" type="range" id="price-${direction}" min="${defaultMinPrice}" max="${defaultMaxPrice}" step="10" value="${direction === 'asc' ? finallyMinPrice : finallyMaxPrice}"/></label>`).join('')}
            <div class="min-max-value">
            ${MIN_MAX.map((value) => `<span class="${value}-price" > $${value === 'min' ? finallyMinPrice : finallyMaxPrice } </span>`).join('')}
            </div>`;
}


export function stockRanges(defaultData: DataType[], filtredData: DataType[]) {
  const defaultStock = defaultData.map(({ stock }) => stock);
  const defaultMinStock = Math.min(...defaultStock);
  const defaultMaxStock = Math.max(...defaultStock);
  const { urlMinStock, urlMaxStock } = getSearchParams();
  const { minProductStock, maxProductStock } = getMinMaxPriceStock(filtredData);
  const finallyMinStock = urlMinStock ? urlMinStock : minProductStock && Number.isFinite(minProductStock) ? minProductStock : defaultMinStock;
  const finallyMaxStock = urlMaxStock ? urlMaxStock : maxProductStock && Number.isFinite(maxProductStock) ? maxProductStock : defaultMaxStock;

  return `${ASC_DESC.map((stock) => `<label class="filters-range-stock__label">
    <input class="filters-range-stock__input" type="range" id="stock-${stock}" min="${defaultMinStock}" max="${defaultMaxStock}" step="10" value="${stock === 'asc' ? finallyMinStock : finallyMaxStock}"/></label>`).join('')}
    <div class="min-max-value">
    ${MIN_MAX.map((value) => `<span class="${value}-stock">${value === 'min' ? finallyMinStock : finallyMaxStock}</span>`).join('')}</div>`;
}

export function createCoupon(couponValue: string, discount: number, applied: boolean) {
  return `<li class="coupons-list__item coupons-item">
    <p class="coupons-item__p"> You ${applied ? 'applied' : 'may apply'} ${ couponValue } coupon with ${ discount }% discount! </p>
      <button class="coupons-item__btn ${applied ? 'applied' : ''}" value="${discount}" name="${couponValue}" type="button">${applied ? 'Drop' : 'Add'}</button></li>`
}
