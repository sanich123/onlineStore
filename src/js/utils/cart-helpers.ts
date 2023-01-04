import { CouponsType } from "../types/types";
import { LS_KEYS } from "./const";
import { getFromLocalStorage, setAmountProperty } from "./local-storage";
import { getTotalAmount, getTotalSumWithAmount } from "./utils";
import AMEXlogo from "../../assets/png/american-express-logo.png";
import VISAlogo from "../../assets/png/visa-logo-png-2024.png";
import MASTERCARDlogo from "../../assets/png/mastercard-logo.png";
import noLogo from "../../assets/png/nologo.png";

export function getTotalSumAndCoupons() {
  const couponsInCart = getFromLocalStorage(LS_KEYS.promocode);
  const itemsInCart = getFromLocalStorage(LS_KEYS.cart);
  const withAmount = itemsInCart.map(setAmountProperty);
  const totalSum = withAmount.reduce(getTotalSumWithAmount, 0);
  const totalAmountOfProducts = withAmount.reduce(getTotalAmount, 0);
  const filtredDiscount = couponsInCart.reduce(
    (total: number, { applied, discount }: CouponsType) =>
      applied ? total + discount : total,
    0
  );
  const finalSum = filtredDiscount
    ? totalSum - totalSum * (filtredDiscount / 100)
    : totalSum;
  return {
    couponsInCart,
    itemsInCart,
    withAmount,
    totalSum,
    totalAmountOfProducts,
    filtredDiscount,
    finalSum,
  };
}

export function getCardLogo(firstNumber: string) {
  if (firstNumber == "3") {
    return AMEXlogo;
  }
  if (firstNumber == "4") {
    return VISAlogo;
  }
  if (firstNumber == "5") {
    return MASTERCARDlogo;
  } else {
    return noLogo;
  }
}
