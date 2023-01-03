import shoppingBags from '../../assets/png/shopping-bags.png';
import basket from '../../assets/png/basket.png';
import noLogo from '../../assets/png/nologo.png';

export function createProductExample() {

    return `<section class="product">
        <div class="product__name">
          <div class="product__title"><span class="text">MacBook Pro</span></div>
          <div class="product__info">

            <div class="gallery">
              
              <div id="gallery">
                <ul id="navigation">
                  <li>
                    <a href="#picture1">
                    <img alt="small picture1" src="${basket}" />
                    </a>
                  </li>
                  <li>
                    <a href="#picture2">
                    <img alt="small picture2" src="${shoppingBags}" />
                    </a>
                  </li>
                  <li>
                    <a href="#picture3">
                    <img alt="small picture3" src="${basket}" />
                    </a>
                  </li>
                  <li>
                    <a href="#picture4">
                    <img alt="small picture4" src="${shoppingBags}" />
                    </a>
                  </li>
                </ul>
                <div id="full-picture">
                  <div>
                    <a name="picture1"></a>
                    <img alt="Large picture1" src="${basket}" />
                  </div>
                  <div>
                    <a name="picture2"></a>
                    <img alt="Large picture2" src="${shoppingBags}" />
                  </div>
                  <div>
                    <a name="picture3"></a>
                    <img alt="Large picture3" src="${basket}" />
                  </div>
                  <div>
                    <a name="picture4"></a>
                    <img alt="Large picture4" src="${shoppingBags}" />
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
                    <span class="text">MacBook Pro 2021 with mini-LED display may launch between September, November</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Discount Percentage:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">Description info will be hereDescription info will be hereDescription info will be hereDescription info will be hereDescription info will be hereDescription info will be hereDescription info will be hereDescription info will be hereDescription info will be here</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Rating:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">Description info will be here</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Stock:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">Description info will be here</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Brand:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">Description info will be here</span>
                  </div>
                </div>
                <div class="desc__item">
                  <div class="item__title">
                    <span class="text">Category:</span>
                  </div>
                  <div class="item__info">
                    <span class="text">Description info will be here</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="price_info">
              <div class="price_info__cost">
                <span class="text">€1,749.00</span>
              </div>
              <div class="price_info__cart">
                <button class="btn_product" type="button" onclick="alert('Продукт добавляется в корзину')">ADD TO CART</button>
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