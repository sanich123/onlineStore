import noLogo from '../../assets/png/nologo.png';
import { DataType } from '../types/types';
import { LS_KEYS } from '../utils/const';
import { getFromLocalStorage } from '../utils/local-storage';

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
                          <input type="text" placeholder="Name" class="form_item">
                        </div>
                        <div class="personal__phone form_item">
                          <input type="tel" placeholder="Phone number" class="form_item">
                        </div>
                        <div class="personal__adress form_item">
                          <input type="text" placeholder="Delivery adress" class="form_item">
                        </div>
                        <div class="personal__email form_item">
                          <input type="email" placeholder="E-mail" class="form_item">
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
                              <input type="number" placeholder="Card number" class="card__form_item">
                            </div>
                          </div>
                          <div class="card__other">
                            <div class="card__valid_info">
                              <h3 class="card__text">VALID:</h3>
                              <input type="number" placeholder="Valid Thru" class="card__form_item">
                            </div>
                            <div class="card__cvv_info">
                              <h3 class="card__text">CVV:</h3>
                              <input type="number" placeholder="Code" class="card__form_item">
                            </div>
                          </div>
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