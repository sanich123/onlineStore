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
    pageNumber: 'pageNumber',
    amountOfItems: 'amountOfItems'
}

export const SORT_TYPES = {
    ascendPrice: 'price-asc',
    descendPrice: 'price-desc',
    ascendRating: 'rating-asc',
    descendRating: 'rating-desc',
}

export const LS_KEYS = {
    cart: 'cart',
    product: 'product',
    inCart: 'in-cart',
    promocode: 'promocode',
}

export const EMPTY_LIST = "<p>We tried so much to find your products, but there are no products to match your filters...</p>";
export const EMPTY_CART = '<p class="empty-cart">There are no items in your cart, go ahead and buy something!</p>';
export const PROMOCODES = {
    newYear: 'fucking new year',
    stupidSanta: 'stupidSanta',
}
export const NEW_YEAR_COUPON = { couponValue: 'newYear',
discount: 10, applied: false };
export const SANTA_COUPON = { couponValue: 'stupidSanta', discount: 15, applied: false };
export const PAGINATION_NAMES = {
    pageBtns: 'page-btns',
    prevBtn: 'prev-btn',
    nextBtn: 'next-btn',
    amountItems: 'amount-items',
}

export const DEFAULT_AMOUNT_ITEMS = 3;
export const DEFAULT_NUMBER_OF_PAGE = 1;

