import { CouponsType } from "../types/types";
import { LS_KEYS } from "./const";
import { setAmountProperty } from "./local-storage";
import { getTotalAmount, getTotalSumWithAmount } from "./utils";

export function getTotalSumAndCoupons() {
    const couponsInCart = JSON.parse(localStorage.getItem(LS_KEYS.promocode) || '[]');
    const itemsInCart = JSON.parse(localStorage.getItem(LS_KEYS.cart) || "[]");
    const withAmount = itemsInCart.map(setAmountProperty);
    const totalSum = withAmount.reduce(getTotalSumWithAmount, 0);
    const totalAmountOfProducts = withAmount.reduce(getTotalAmount, 0);
    const filtredDiscount = couponsInCart.reduce((total: number, { applied, discount }: CouponsType) => applied ? total + discount : total, 0);
    const finalSum = filtredDiscount ? totalSum - (totalSum * (filtredDiscount / 100)) : totalSum;
    return {
        couponsInCart, itemsInCart, withAmount, totalSum, totalAmountOfProducts, filtredDiscount, finalSum
    }
}