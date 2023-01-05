import shoppingBags from '../../assets/png/shopping-bags.png';
import basket from '../../assets/png/basket.png';
import { getTotalSumAndCoupons } from '../utils/cart-helpers';


export function createHeader() {
  const { finalSum, totalAmountOfProducts } = getTotalSumAndCoupons();

    return `<header class="header">
      <div class="header__logo">
        <div class="logo">
          <a class="logo__home" href="/#catalog">
            <img src="${shoppingBags}" alt="logo" />
          </a>
          </div>
        <div class="logo__text">Online Store</div>
      </div>

      <div class="total">
        <div class="total__text">Cart total: </div>
        <div class="total__summary"> €${Math.round(finalSum)}</div>
      </div>

      <div class="logo__basket">
        <div class="basket">
          <a class="logo__basket" href="/#cart">
          <img src="${basket}" alt="basket">
          <span> ${totalAmountOfProducts}</span>
          </a>
        </div>
      </div>
    </header>`
}