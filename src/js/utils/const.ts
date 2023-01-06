import { createArrowDown, createArrowUp } from "../markup/create-icons";
import { ObjectKeys } from "../types/types";

export const routes = {
  catalog: "#catalog",
  product: "#product",
  cart: "#cart",
};
export const SIZE_VALUES = ["Shallow", "Wide"];

export const priceOrStockMap: ObjectKeys = {
  "price-asc": "minPrice",
  "price-desc": "maxPrice",
  "stock-asc": "minStock",
  "stock-desc": "maxStock",
};

export const SEARCH_KEYS = {
  brand: "brand",
  category: "category",
  sort: "sort",
  size: "size",
  search: "search",
  minPrice: "minPrice",
  maxPrice: "maxPrice",
  minStock: "minStock",
  maxStock: "maxStock",
  pageNumber: "pageNumber",
  amountOfItems: "amountOfItems",
  modal: "modalOpen",
};

export const SORT_TYPES = {
  ascendPrice: "price-asc",
  descendPrice: "price-desc",
  ascendRating: "rating-asc",
  descendRating: "rating-desc",
};

export const LS_KEYS = {
  cart: "cart",
  product: "product",
  inCart: "in-cart",
  promocode: "promocode",
};

export const EMPTY_LIST =
  "<p>We tried so much to find your products, but there are no products to match your filters...</p>";
export const EMPTY_CART =
  '<p class="empty-cart">There are no items in your cart, go ahead and buy something!</p>';
export const PROMOCODES = {
  newYear: "fucking new year",
  stupidSanta: "stupidSanta",
};
export const NEW_YEAR_COUPON = {
  couponValue: "newYear",
  discount: 10,
  applied: false,
};
export const SANTA_COUPON = {
  couponValue: "stupidSanta",
  discount: 15,
  applied: false,
};
export const PAGINATION_NAMES = {
  pageBtns: "page-btns",
  prevBtn: "prev-btn",
  nextBtn: "next-btn",
  amountItems: "amount-items",
};

export const DEFAULT_AMOUNT_ITEMS = 9;
export const DEFAULT_NUMBER_OF_PAGE = 1;
export const INCREMENT_BTN = "increment";

export const priceRadioValues = [
  {
    value: "price-asc",
    icon: `Price ${createArrowUp()}`,
  },
  {
    value: "price-desc",
    icon: `Price ${createArrowDown()}`,
  },
  {
    value: "rating-asc",
    icon: `Rating ${createArrowUp()}`,
  },
  {
    value: "rating-desc",
    icon: `Rating ${createArrowDown()}`,
  },
];

export const INPUTS_DATA = [
  {
    class: "name",
    type: "text",
    pattern: "[a-zA-Z]{3,}(\\s[a-zA-Z]{3,})+",
    title: "Please enter correct first and last name",
    placeholder: "Name",
  },
  {
    class: "phone",
    type: "tel",
    pattern: "\\+[0-9]{9,}",
    title:
      "Please enter correct phone number: starts with " +
      ", contains only digits, no shorter than 9 digits",
    placeholder: "Phone number",
  },
  {
    class: "adress",
    type: "text",
    pattern: "[a-zA-Z]{5,}(\\s[a-zA-Z]{5,})(\\s[a-zA-Z]{5,})+",
    title:
      "Please enter correct delivery adress: contains at least three words, each at least 5 characters long",
    placeholder: "Delivery adress",
  },
  {
    class: "email",
    type: "email",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    title: "Please enter correct e-mail adress",
    placeholder: "E-mail",
  },
];

export const ASC_DESC = ['asc', 'desc'];
export const MIN_MAX = ['min', 'max'];
