import shoppingBags from '../../assets/png/shopping-bags.png';
import { getTotalSumAndCoupons } from '../utils/cart-helpers';
import { createRsSchoolIcon } from './create-icons';


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
  return `<footer class="page__footer footer">
      <ul class="footer__list footer-list">
        <li class="footer-list__item list-item">
          <a href="https://rs.school/js/">
            ${createRsSchoolIcon()}
          </a>
        </li>
        <li class="footer-list__item list-item">
          <a class="author-link" href="https://github.com/sanich123">
          sanich123
          </a>
        </li>
        <li class="footer-list__item list-item">
          <a class="author-link" href="https://github.com/wasek07">
          wasek07
          </a>
        </li>
        <li сlass="footer-list__item list-item">
          <span class="list-item__year">2022 г.</span>
        </li>
      </ul>
    </footer>`
}
