import { ObjectKeys } from "../types/types";

export const routes = {
    catalog: '#catalog',
    product: '#product',
    cart: '#cart',
}
export const SIZE_VALUES = ['Shallow', 'Wide'];

export const priceOrStockMap: ObjectKeys = {
    'price-asc': 'minPrice',
    'price-desc': 'maxPrice',
    'stock-asc': 'minStock',
    'stock-desc': 'maxStock',
}

export const SEARCH_KEYS = {
    brand: 'brand',
    category: 'category',
    sort: 'sort',
    size: 'size',
    search: 'search',
    minPrice: 'minPrice',
    maxPrice: 'maxPrice',
    minStock: 'minStock',
    maxStock: 'maxStock',
}

export const SORT_TYPES = {
    ascendPrice: 'price-asc',
    descendPrice: 'price-desc',
    ascendRating: 'rating-asc',
    descendRating: 'rating-desc',
}

