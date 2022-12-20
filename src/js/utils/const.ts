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
    sortPrice: 'sortPrice',
    sortRating: 'sortRating',
    size: 'size',
    search: 'search',
}

