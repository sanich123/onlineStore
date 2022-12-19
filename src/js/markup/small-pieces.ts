export function brandCheckbox(brand: string) {
  return `<label class="filters-brand__label">
  <input class="filters-brand__input" type="checkbox" value="${brand}"/> 
  ${brand}</label>`;
}

export function categoryCheckbox(category: string) {
  return `<label class="filters-category__label">
    <input class="filters-category__input" type="checkbox" value="${category}"/> 
    ${category}</label>`;
}

export function priceRanges(minPrice: number, maxPrice: number) {
  return `<label class="filters-range-price__label">
              <span class="minPrice">$${minPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-asc"
                min="${minPrice}"
                max="${maxPrice}"
                step="10"
                value="${minPrice}"
              /> </label
            ><br />
            <label class="filters-range-price__label">
              <span class="maxPrice">$${maxPrice}</span>
              <input
                class="filters-range-price__input"
                type="range"
                id="price-desc"
                min="${minPrice}"
                max="${maxPrice}"
                step="10"
                value="${minPrice}"
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
                value="${minStock}"
              /> </label
            ><br />
            <label class="filters-range-stock__label">
              <span class="maxStock">${maxStock}</span>
              <input
                class="filters-range__input"
                type="range"
                id="stock-desc"
                min="${minStock}"
                max="${maxStock}"
                step="10"
                value="${maxStock}"
              />
            </label>`;
}
