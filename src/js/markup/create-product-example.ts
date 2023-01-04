import noLogo from '../../assets/png/nologo.png';
import AMEXlogo from '../../assets/png/american-express-logo.png';
import VISAlogo from '../../assets/png/visa-logo-png-2024.png'
import MASTERCARDlogo from '../../assets/png/mastercard-logo.png';
import { DataType } from '../types/types';
import { LS_KEYS } from '../utils/const';
import { getFromLocalStorage } from '../utils/local-storage';


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
                <div class="modal">
                  <div class="modal-content">
                    <form action="#" method="get" enctype="multipart/form-data" class="form">
                      <span class="close-button">&times;</span>
                      <div class="personal">
                        <h2>Personal details</h2>
                        <div class="personal__name form_item">
                          <input type="text" pattern="[a-zA-Z]{3,}(\s[a-zA-Z]{3,})+" title="Please enter correct first and last name" placeholder="Name" class="form_item">
                        </div>
                        <div class="personal__phone form_item">
                          <input type="tel" pattern="\+[0-9]{9,}" title="Please enter correct phone number: starts with '+', contains only digits, no shorter than 9 digits" placeholder="Phone number" class="form_item">
                        </div>
                        <div class="personal__adress form_item">
                          <input type="text" pattern="[a-zA-Z]{5,}(\s[a-zA-Z]{5,})(\s[a-zA-Z]{5,})+" title="Please enter correct delivery adress: contains at least three words, each at least 5 characters long" placeholder="Delivery adress" class="form_item">
                        </div>
                        <div class="personal__email form_item">
                          <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter correct e-mail adress" placeholder="E-mail" class="form_item">
                        </div>
                      </div>

                      <div class="card">
                        <h2>Credit card details</h2>
                        <div class="card__info">
                          <div class="card__numberlogo">
                            <div class="card__logo">
                            <img alt="nologo" class="card__img" src="${noLogo}" />
                            </div>
                            <div class="card__number">
                              <input id="card-number" pattern="^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$" title="Please enter correct 16 digital number of your card" placeholder="Card number" class="card__form_item">
                            </div>
                          </div>
                          <div class="card__other">
                            <div class="card__valid_info">
                              <h3 class="card__text">VALID:</h3>
                              <input id="expiration-date" pattern="^[0-9]{2}[/][0-9]{2}$" title="Please enter card validity period" placeholder="Valid Thru" class="card__form_item">
                            </div>
                            <div class="card__cvv_info">
                              <h3 class="card__text">CVV:</h3>
                              <input id="cvv" pattern="^[0-9]{3}$" placeholder="Code" title="Please enter CVV code" period"class="card__form_item">
                            </div>
                          </div>
                        </div>
                        <div class="btn-confirm-wrapper">
                        <input class="btn-confirm" type="submit" value="CONFIRM" onclick="alert('Payment was successful')"></input>
                        </div>
                          </div>
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`
}
