import noLogo from '../../assets/png/nologo.png';
import AMEXlogo from '../../assets/png/american-express-logo.png';
import VISAlogo from '../../assets/png/visa-logo-png-2024.png'
import MASTERCARDlogo from '../../assets/png/mastercard-logo.png';
import { DataType } from '../types/types';
import { LS_KEYS } from '../utils/const';
import { getFromLocalStorage } from '../utils/local-storage';
import { createModal } from './create-modal';


//это функция для замены логотипа банковской карты в зависимости от вводимого номера. 
/*
export function get_card_logo(card_number: number) {
  if (card_number[0] == '3') {
      return `${AMEXlogo}`;
  }
  if (card_number[0] == '4') {
      return `${VISAlogo}`;
  }
  if (card_number[0] == '5') {
      return `${MASTERCARDlogo}`;
  }
  else {
      return `${noLogo}`;
  }
}
*/

export function createProductExample(filtredData: DataType[]) {
  const [{ id, title, images, thumbnail, category, brand, description, price, discountPercentage, rating, stock }] = filtredData;
  const inCartIds = getFromLocalStorage(LS_KEYS.cart).map(({ id }: { id: number }) => id);

    return `<section class="product">
        <div class="product__name">
          <div class="product__title"><span class="text">${title}</span></div>
          <div class="product__info">

            <div class="gallery">
              
              <div id="gallery">
                <ul id="navigation">
                ${[...new Set(images)].map((image) => `<li><img alt="" src="${image}" /></li>`)}
                </ul>
                <div id="full-picture">
                  <div>
                    <img class="big-picture" alt="Large picture2" src="${thumbnail}" />
                  </div>
                 </div>
              </div>

            </div>
            <div class="desc">
              <div class="desc__items">
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Description:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${description}</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Discount Percentage:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${discountPercentage}</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Rating:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${rating}</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Stock:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${stock}</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Brand:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${brand}</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Category:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">${category}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="price_info">
              <div class="price_info__cost">
                <span class="text">€${price}</span>
              </div>
              <div class="price_info__cart">
                <button name="${inCartIds.includes(Number(id)) ? 'in-cart' : 'cart'}" class="btn_product ${inCartIds.includes(Number(id)) ? 'in-cart' : ''}" value="${id}" type="button">${inCartIds.includes(Number(id)) ? 'IN ' : 'ADD TO'}CART</button>
              </div>
              <div class="price_info__buy">
                <button class="modal_func btn_product">BUY NOW</button>
                ${createModal()}
              </div>
            </div>
          </div>
        </div>
      </section>`
}
