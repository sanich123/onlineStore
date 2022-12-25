import { mocks } from "../mocks/mocks";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { DataType } from "../types/types";
import { LS_KEYS, NEW_YEAR_COUPON, PROMOCODES, routes, SANTA_COUPON } from "./const";

export function localStorageHelper(name: string, value: string, ids: number[], storageItems: DataType[]) {
    if (name === LS_KEYS.product) {
        window.history.pushState({}, '', `${routes.product}/${value}`);
        CreateProduct();
    }
    if (name === LS_KEYS.cart) {
        const [filtredValue] = mocks.filter(({ id }) => id === +value);

        if (!localStorage.getItem(LS_KEYS.cart)) {
            localStorage.setItem(LS_KEYS.cart, JSON.stringify([filtredValue]));
            CreateCatalog();
        } else {
            if (!ids.includes(+value)) {
                storageItems.push(filtredValue);
                localStorage.setItem(LS_KEYS.cart, JSON.stringify(storageItems));
                CreateCatalog();
            }
        }
    }
    if (name === LS_KEYS.inCart) {
        const filtred = storageItems.filter(({ id }) => id !== +value);
        localStorage.setItem(LS_KEYS.cart, JSON.stringify(filtred));
        CreateCatalog();
    }
}

export function localStorageCouponHelper(coupon: string) {
    const couponsInCart = JSON.parse(localStorage.getItem(LS_KEYS.promocode) || '[]');
    if (coupon === PROMOCODES.newYear) {
        if (!couponsInCart) {
            localStorage.setItem(LS_KEYS.promocode, JSON.stringify([NEW_YEAR_COUPON]));
        } else {
            if (!JSON.stringify(couponsInCart).includes(JSON.stringify(NEW_YEAR_COUPON))) {
                couponsInCart.push(NEW_YEAR_COUPON);
                localStorage.setItem(LS_KEYS.promocode, JSON.stringify(couponsInCart));
            }
        }
    }
    if (coupon === PROMOCODES.stupidSanta) {
        if (!couponsInCart) {
            localStorage.setItem(LS_KEYS.promocode, JSON.stringify([SANTA_COUPON]));
        } else {
            if (!JSON.stringify(couponsInCart).includes(JSON.stringify(SANTA_COUPON))) {
                couponsInCart.push(SANTA_COUPON);
                localStorage.setItem(LS_KEYS.promocode, JSON.stringify(couponsInCart));
            }
        }
    }
}