import shoppingBags from '../../assets/png/shopping-bags.png';
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
      <div class="basket">
          <a class="logo__basket" href="/#cart">
            <div class="total_almount">
              <span class="almount_text">${totalAmountOfProducts}</span>
            </div>
          </a>
        </div>
    </header>`
}

export function createFooter() {
  return `<footer class="footer">
   <span>Online-Store, 2023</span>
   </footer>`
}
