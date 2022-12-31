export function brandCheckbox(brand: string) {
  return `<label class="filters-brand__label">
  <input class="filters-brand__input" type="checkbox" name="brand" value="${brand}"/> 
  ${brand}</label>`;
}

export function categoryCheckbox(category: string) {
  return `<label class="filters-category__label">
    <input class="filters-category__input" type="checkbox" name="category" value="${category}"/> 
    ${category}</label>`;
}

export function priceRanges(minPrice: number, maxPrice: number, urlMinPrice: string, urlMaxPrice: string) {
  return `<label class="filters-range-price__label">
              <span class="minPrice">$${urlMinPrice ? urlMinPrice : minPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-asc"
                min="${minPrice}"
                max="${maxPrice}"
                step="10"
                value="${urlMinPrice ? urlMinPrice : minPrice}"
              /> </label
            ><br />
            <label class="filters-range-price__label">
              <span class="maxPrice">$${urlMaxPrice ? urlMaxPrice : maxPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-desc"
                min="${minPrice}"
                max="${maxPrice}"
                step="10"
                value="${urlMaxPrice ? urlMaxPrice : maxPrice}"
              />
            </label>`;
}


export function stockRanges(minStock: number, maxStock: number) {
  return `<label class="filters-range-stock__label">
              <span class="minStock">${minStock}</span>
              <input
                class="filters-range-stock__input"
                type="range"
                id="stock-asc"
                min="${minStock}"
                max="${maxStock}"
                step="10"
                value=""
              /> </label
            ><br />
            <label class="filters-range-stock__label">
              <span class="maxStock">${maxStock}</span>
              <input
                class="filters-range-stock__input"
                type="range"
                id="stock-desc"
                min="${minStock}"
                max="${maxStock}"
                step="10"
                value=""
              />
            </label>`;
}

export function createCoupon(couponValue: string, discount: number, applied: boolean) {
  return `<li class="coupons-list__item coupons-item">
    <p class="coupons-item__p"> You ${applied ? 'applied' : 'may apply'} ${ couponValue } coupon with ${ discount }% discount! </p>
      <button class="coupons-item__btn ${applied ? 'applied' : ''}" value="${discount}" name="${couponValue}" type="button">${applied ? 'Drop' : 'Add'}</button></li>`
}
