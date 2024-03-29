import { CouponsType } from "../types/types";
import { PROMOCODES } from "../utils/const";
import { createCoupon } from "./create-inputs";

export function createTotalInfo(totalSum: number, totalAmountOfProducts: number, couponsInCart: CouponsType[], filtredDiscount: number, finalSum: number) {

  return `<div class="cart__total-info total-info">
          ${filtredDiscount ? `<p class="total-info__price">Total price: ${(finalSum).toLocaleString('ru')}$</p>` : ''}
          <p class="total-info__price ${filtredDiscount ? 'line-through' : ''}">Total price: ${totalSum.toLocaleString('ru')}$</p>
          <p class="total-info__amount">Amount of items: ${totalAmountOfProducts}</p>
          <button class="total-info__accept" ${!totalSum ? 'disabled' : ''}>Purchase items</button>
          <form class="total-info__coupon-form coupon-form">
            <label class="coupon-form__label">
              Have a coupon?<br> Type it and we'll give you a discount. Maybe.
              <input
                title="Купон вбил - скидку получил. Резче давай."
                class="coupon-form__input"
                type="text"
                placeholder="Type your coupon"
              />
              <span class="coupon-form__label--promo">Try "${PROMOCODES.newYear}" and "${PROMOCODES.stupidSanta}"</span>
            </label>
          </form>
          ${couponsInCart.length && totalAmountOfProducts ? `<ul class="coupon-form__list coupons-list">
          ${couponsInCart.map(({ couponValue, discount, applied }) => createCoupon(couponValue, discount, applied)).join('')}
          </ul>` : ''}
        </div>`
}