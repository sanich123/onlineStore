import { mocks } from "../mocks/mocks";
import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { CouponsType, DataType } from "../types/types";
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
        CreateCart();
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
        CreateCart();
    }
    
}

export function setAmountProperty(item: DataType) {
    if (!item.amount) {
        item.amount = 1;
        return item;
    } else {
        return item;
    }
}

export function incrementDecrementCounter(
    name: string,
    value: string,
    itemsInCart: DataType[]
) {
    if (name === "increment") {
        itemsInCart.map((cartItem: DataType) => {
            if (
                cartItem.id === Number(value) &&
                cartItem.amount &&
                cartItem.amount < cartItem.stock
            ) {
                cartItem.amount += 1;
                return cartItem;
            } else {
                return cartItem;
            }
        });
    } else {
        itemsInCart.map((cartItem: DataType) => {
            if (cartItem.id === Number(value) && cartItem.amount) {
                cartItem.amount -= 1;
                return cartItem;
            } else {
                return cartItem;
            }
        });
    }
    const filtredFalsy = itemsInCart.filter(({ amount }) => amount);
    localStorage.setItem(LS_KEYS.cart, JSON.stringify(filtredFalsy));
    CreateCart();
}

export function setAppliedToCoupons(coupons: CouponsType[], couponName: string) {
    return coupons.map((coupon: CouponsType) => {
        if (coupon.couponValue === couponName) {
            coupon.applied = !coupon.applied;
            return coupon;
        }
        return coupon;
    });
}