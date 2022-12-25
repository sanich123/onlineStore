export function createTotalInfo() {
    return `<div class="cart__total-info total-info">
          <p class="total-info__price">Total price: 3879$</p>
          <p class="total-info__amount">Amount of items: 3</p>
          <button class="total-info__accept">Purchase items</button>
          <form class="total-info__coupon-form coupon-form">
            <label class="coupon-form__label">
              Have a coupon?<br> Type it and we'll give you a discount. Maybe.
              <input
                title="Купон вбил - скидку получил. Резче давай."
                class="coupon-form__input"
                type="text"
                placeholder="Type your coupon"
              />
              <span class="coupon-form__label--promo">Try "Happy New Year, motherfucker" and Santa will give you a discount</span>
            </label>
          </form>
        </div>`
}