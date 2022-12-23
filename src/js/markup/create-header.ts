import shoppingBags from '../../assets/png/shopping-bags.png';
import basket from '../../assets/png/basket.png';

export function createHeader() {
    return `<header class="header">
      <div class="header__logo">
        <div class="logo">
          <a href="#logo" class="logo__home">
            <img src="${shoppingBags}" alt="logo" />
          </a>
        </div>
        <div class="logo__text">Online Store</div>
      </div>

      <div class="total">
        <div class="total__text">Cart total:</div>
        <div class="total__summary">€ 0,00</div>
      </div>

      <div class="logo__basket">
        <div class="basket">
          <a href="#" class="logo__basket">
          <img src="${basket}" alt="basket">
          </a>
        </div>
      </div>
    </header>`
}