import { mocks } from "../mocks/mocks";
import CreateCart from "../pages/create-cart";
import CreateCatalog from "../pages/create-catalog";
import CreateProduct from "../pages/create-product";
import { CouponsType, DataType } from "../types/types";
import { INCREMENT_BTN, LS_KEYS, NEW_YEAR_COUPON, PROMOCODES, routes, SANTA_COUPON } from "./const";

export function localStorageHelper(name: string, value: string, ids: number[], storageItems: DataType[]) {
  if (name === LS_KEYS.product) {
    window.history.pushState({}, "", `${routes.product}/${value}`);
    return CreateProduct();
  }
  if (name === LS_KEYS.cart) {
    const [filtredValue] = mocks.filter(({ id }) => id === +value);
    if (!localStorage.getItem(LS_KEYS.cart)) {
      applyToLocalStorage(LS_KEYS.cart, [filtredValue]);
    } else {
      if (!ids.includes(+value)) {
        storageItems.push(filtredValue);
        applyToLocalStorage(LS_KEYS.cart, storageItems);
      }
    }
  }
  if (name === LS_KEYS.inCart) {
    const filtred = storageItems.filter(({ id }) => id !== +value);
    localStorage.setItem(LS_KEYS.cart, JSON.stringify(filtred));
  }
  CreateCatalog();
}

export function localStorageCouponHelper(coupon: string) {
  const couponsInCart = getFromLocalStorage(LS_KEYS.promocode);
  if (coupon === PROMOCODES.newYear) {
    if (!couponsInCart) applyToLocalStorage(LS_KEYS.promocode, [NEW_YEAR_COUPON]);
    else {
      if (!JSON.stringify(couponsInCart).includes(JSON.stringify(NEW_YEAR_COUPON))) {
        couponsInCart.push(NEW_YEAR_COUPON);
        applyToLocalStorage(LS_KEYS.promocode, couponsInCart);
      }
    }
    CreateCart();
  }
  if (coupon === PROMOCODES.stupidSanta) {
    if (!couponsInCart) applyToLocalStorage(LS_KEYS.promocode, [SANTA_COUPON]);
    else {
      if (!JSON.stringify(couponsInCart).includes(JSON.stringify(SANTA_COUPON))) {
        couponsInCart.push(SANTA_COUPON);
        applyToLocalStorage(LS_KEYS.promocode, couponsInCart);
      }
    }
    CreateCart();
  }
}

export function setAmountProperty(item: DataType) {
  if (!item.amount) item.amount = 1;
  return item;
}

export function incrementDecrementCounter(name: string, value: string, itemsInCart: DataType[]) {
  if (name === INCREMENT_BTN) {
    itemsInCart.map((cartItem: DataType) => {
      if (cartItem.id === Number(value) && cartItem.amount && cartItem.amount < cartItem.stock) {
        cartItem.amount += 1;
      }
      return cartItem;
    });
  } else {
    itemsInCart.map((cartItem: DataType) => {
      if (cartItem.id === Number(value) && cartItem.amount) {
        cartItem.amount -= 1;
      }
      return cartItem;
    });
  }
  const filtredFalsy = itemsInCart.filter(({ amount }) => amount);
  applyToLocalStorage(LS_KEYS.cart, filtredFalsy);
  CreateCart();
}

export function setAppliedToCoupons(coupons: CouponsType[], couponName: string) {
  return coupons.map((coupon: CouponsType) => {
    if (coupon.couponValue === couponName) coupon.applied = !coupon.applied;
    return coupon;
  });
}

export function deleteAppliedCoupons(coupons: CouponsType[], name: string) {
  const actualCoupons = coupons.filter(({ couponValue }: CouponsType) => couponValue !== name);
  applyToLocalStorage(LS_KEYS.promocode, actualCoupons);
  return CreateCart();
}

export function applyToLocalStorage(key: string, arr: CouponsType[] | DataType[]) {
  localStorage.setItem(key, JSON.stringify(arr)); 
}

export function getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
